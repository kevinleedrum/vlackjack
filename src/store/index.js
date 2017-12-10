import Vue from 'vue';
import Vuex from 'vuex';
import blackjack from '@/lib/blackjack';
Vue.use(Vuex);

const { BUST, WIN, LOSE, PUSH, BLACKJACK } = blackjack.results;

const DEFAULT_DELAY = 500;
const DEALER_DECISION_DELAY = 750;

const BASE_HAND = {
  cards: [],
  result: undefined,
  bets: []
};

const clone = obj => JSON.parse(JSON.stringify(obj));

const state = {
  isTitleShowing: true,
  settings: {
    deckCount: 6,
    startingBank: 25,
    shuffleAfterPercent: 0.75,
    minimumBet: 1
  },
  bank: 0,
  shoe: [],
  hands: [],
  activeHandIndex: null,
  isDealing: false
};

const getters = {
  activeHand (state) {
    return state.hands[state.activeHandIndex];
  },
  dealerTotal (state) {
    return blackjack.score(state.hands[0].cards);
  },
  isSplit (state) {
    return state.hands.length > 2;
  },
  canSplit (state) {
    if (!state.hands.length || !state.activeHandIndex) return false;
    if (state.hands.length > 2) return false;
    const cards = state.hands[state.activeHandIndex].cards;
    return cards.length === 2 && cards[0].value === cards[1].value;
  },
  canDoubleDown (state) {
    if (!state.hands.length || !state.activeHandIndex) return false;
    const cards = state.hands[state.activeHandIndex].cards;
    return cards.length === 2;
  }
};

const mutations = {
  hideTitleScreen (state) {
    state.isTitleShowing = false;
  },
  resetShoe (state) {
    state.shoe = blackjack.createShoe(state.settings.deckCount);
    state.shoe = blackjack.shuffle(state.shoe);
  },
  resetBank (state) {
    state.bank = state.settings.startingBank;
  },
  resetHands (state) {
      state.hands = [clone(BASE_HAND), clone(BASE_HAND)];
  },
  bet (state) {
    if (state.bank < state.settings.minimumBet) return;
    state.bank -= state.settings.minimumBet;
    const bets = [state.settings.minimumBet];
    state.hands[1].bets = bets.slice();
  },
  doubleBet (state) {
    const bets = state.hands[state.activeHandIndex].bets;
    state.bank -= bets[0];
    bets[1] = bets[0];
    state.hands[state.activeHandIndex].bets = bets.slice();
  },
  deal (state, { handIndex }) {
    const hand = state.hands[handIndex];
    let newCard = state.shoe.shift();
    const isFirstDealerCard = handIndex === 0 && !hand.cards.length;
    newCard.isFaceDown = isFirstDealerCard;
    hand.cards.push(newCard);
  },
  setIsDealing (state, { isDealing }) {
    state.isDealing = isDealing;
  },
  split (state) {
    const hands = state.hands.slice();
    hands[2] = clone(BASE_HAND);
    hands[2].cards.push(hands[1].cards.pop());
    hands[2].bets[0] = hands[1].bets[0];
    state.bank -= hands[2].bets[0];
    state.hands = hands;
  },
  checkForBustsAndBlackjacks (state) {
    const hands = clone(state.hands);
    for (let i = 0; i < hands.length; i++) {
      const hand = hands[i];
      const total = blackjack.score(hand.cards);
      if (total > 21) hand.result = BUST;
      if (total === 21 && hand.cards.length === 2) {
        hand.result = BLACKJACK;
      }
      if (i > 0 && hands[0].result === BLACKJACK) {
        if (hand.result === BLACKJACK) hand.result = PUSH;
        if (!hand.result) hand.result = LOSE;
      }
    }
    state.hands = hands;
  },
  compareHands (state) {
    const hands = clone(state.hands);
    for (let i = 1; i < hands.length; i++) {
      const hand = hands[i];
      const total = blackjack.score(hand.cards);
      const dealerTotal = blackjack.score(hands[0].cards);
      if (dealerTotal === total) hand.result = PUSH;
      if (dealerTotal > 21 && !hand.result) hand.result = WIN;
      if (total > dealerTotal && !hand.result) hand.result = WIN;
      if (dealerTotal > total && !hand.result) hand.result = LOSE;
    }
    state.hands = hands;
  },
  settleHands (state) {
    const hands = clone(state.hands);
    for (let i = 1; i < hands.length; i++) {
      const hand = hands[i];
      if (hand.result === BLACKJACK) {
        hand.bets = Array(3).fill(hand.bets[0]);
      }
      if (hand.result === WIN) hand.bets.push(...hand.bets);
      if ([LOSE, BUST].includes(hand.result)) hand.bets = [];
    }
    state.hands = hands;
  },
  collectWinnings (state) {
    const hands = clone(state.hands);
    for (let i = 1; i < hands.length; i++) {
      const hand = hands[i];
      const winnings = hand.bets.reduce((a, b) => a + b, 0);
      state.bank += winnings;
      hand.bets = [];
    }
    state.hands = hands;
  },
  revealDealerHand (state) {
    state.hands[0].cards[0].isFaceDown = false;
  },
  advanceActiveHand (state) {
    if (state.activeHandIndex > 0) state.activeHandIndex--;
    if (state.activeHandIndex === null) state.activeHandIndex = state.hands.length - 1;
  },
  resetActiveHand (state) {
    state.activeHandIndex = null;
  }
};

const actions = {
  startNewGame ({ commit, dispatch }) {
    commit('hideTitleScreen');
    commit('resetShoe');
    commit('resetBank');
    dispatch('resetRound');
  },
  resetRound ({ commit, dispatch }) {
    commit('resetHands');
    dispatch('reshuffleIfNeeded');
    commit('bet');
    dispatch('dealRound');
  },
  reshuffleIfNeeded ({ commit, state }) {
    const shoeUsedPercent = 1 - (state.shoe.length / state.settings.deckCount * 52);
    if (shoeUsedPercent >= state.settings.shuffleAfterPercent) {
      commit('resetShoe');
    }
  },
  dealRound ({ commit, dispatch, state }) {
    if (!state.hands[1].bets[0]) return; // must have a bet to deal round
    const dealQueue = [1, 0, 1, 0]; // player, dealer, player, dealer
    dealQueue.forEach((handIndex, i) => {
      setTimeout(() => { commit('deal', { handIndex }); }, DEFAULT_DELAY * (i + 1));
    });
    setTimeout(() => { dispatch('startRound'); }, DEFAULT_DELAY * 5);
  },
  startRound ({ commit, dispatch }) {
    commit('checkForBustsAndBlackjacks');
    if (state.hands.find(hand => hand.result)) {
      dispatch('endRound');
    } else {
      dispatch('startNextTurn');
    }
  },
  startNextTurn ({ state, commit, dispatch, getters }) {
    commit('advanceActiveHand');
    if (getters.activeHand.cards.length === 1) { // a newly split hand
      let onlyOnce = getters.activeHand.cards[0].value === 'A';
      setTimeout(() => { dispatch('hit', { onlyOnce }); }, DEFAULT_DELAY);
    }
    if (state.activeHandIndex === 0) {
      setTimeout(() => {
        commit('revealDealerHand');
        setTimeout(() => { dispatch('makeDealerDecision'); }, DEALER_DECISION_DELAY);
      }, DEFAULT_DELAY);
    }
  },
  makeDealerDecision ({ state, commit, dispatch, getters }) {
    const remainingHands = state.hands.find((hand, i) => !hand.result && i > 0);
    if (getters.dealerTotal < 17 && remainingHands) {
      dispatch('hit', { isDealer: true });
    } else {
      dispatch('stand');
    }
  },
  hit ({ commit, dispatch, getters, state }, { onlyOnce = false, isDealer = false }) {
    commit('setIsDealing', { isDealing: true });
    commit('deal', { handIndex: state.activeHandIndex });
    setTimeout(() => {
      commit('checkForBustsAndBlackjacks');
      commit('setIsDealing', { isDealing: false });
      if (getters.activeHand.result || onlyOnce) return dispatch('endTurn');
      if (blackjack.score(getters.activeHand.cards) === 21) return dispatch('endTurn');
      if (isDealer) dispatch('makeDealerDecision');
    }, DEFAULT_DELAY);
  },
  doubleDown ({ commit, dispatch }) {
    commit('setIsDealing', { isDealing: true });
    commit('doubleBet');
    setTimeout(() => { dispatch('hit', { onlyOnce: true }); }, DEFAULT_DELAY);
  },
  split ({ commit, dispatch }) {
    commit('split');
    commit('resetActiveHand');
    setTimeout(() => {
      dispatch('startNextTurn');
    }, DEFAULT_DELAY * 2);
  },
  stand ({ dispatch }) {
    dispatch('endTurn');
  },
  endTurn ({ dispatch, state }) {
    if (state.activeHandIndex > 0) {
      dispatch('startNextTurn');
    } else {
      dispatch('endRound');
    }
  },
  endRound ({ commit, dispatch }) {
    commit('resetActiveHand');
    commit('compareHands');
    setTimeout(() => { commit('settleHands'); }, DEFAULT_DELAY * 1.5);
    setTimeout(() => { commit('collectWinnings'); }, DEFAULT_DELAY * 3.5);
    setTimeout(() => { dispatch('resetRound'); }, DEFAULT_DELAY * 4);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
