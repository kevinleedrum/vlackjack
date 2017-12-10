import blackjack from '@/lib/blackjack';

const DEFAULT_DELAY = 500;
const DEALER_DECISION_DELAY = 750;

export default {
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
  startRound ({ commit, dispatch, state }) {
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
