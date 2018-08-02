import blackjack from '@/lib/blackjack'

const { BUST, WIN, LOSE, PUSH, BLACKJACK } = blackjack.results
const BASE_HAND = {
  cards: [],
  result: undefined,
  bets: []
}
const clone = obj => JSON.parse(JSON.stringify(obj))

export default {
  hideTitleScreen (state) {
    state.isTitleShowing = false
  },
  toggleDrawer (state, { show }) {
    state.showDrawer = show === undefined ? !state.showDrawer : show
  },
  toggleBasicStrategy (state) {
    state.settings.showBasicStrategy = !state.settings.showBasicStrategy
  },
  resetShoe (state, { _blackjack = blackjack }) {
    state.shoe = _blackjack.createShoe(state.settings.deckCount)
    state.shoe = _blackjack.shuffle(state.shoe)
  },
  resetBank (state) {
    state.bank = state.settings.startingBank
  },
  resetHands (state) {
    state.hands = [clone(BASE_HAND), clone(BASE_HAND)]
  },
  bet (state) {
    if (state.bank < state.settings.minimumBet) return
    state.bank -= state.settings.minimumBet
    const bets = [state.settings.minimumBet]
    state.hands[1].bets = bets.slice()
  },
  doubleBet (state) {
    const bets = state.hands[state.activeHandIndex].bets
    state.bank -= bets[0]
    bets[1] = bets[0]
    state.hands[state.activeHandIndex].bets = bets.slice()
  },
  deal (state, { handIndex }) {
    const hand = state.hands[handIndex]
    let newCard = state.shoe.shift()
    const isFirstDealerCard = handIndex === 0 && hand.cards.length === 0
    newCard.isFaceDown = isFirstDealerCard
    hand.cards.push(newCard)
  },
  setIsDealing (state, { isDealing }) {
    state.isDealing = isDealing
  },
  split (state) {
    const hands = state.hands.slice()
    hands[2] = clone(BASE_HAND)
    hands[2].cards.push(hands[1].cards.pop())
    hands[2].bets[0] = hands[1].bets[0]
    state.bank -= hands[2].bets[0]
    state.hands = hands
  },
  checkForBustsAndBlackjacks (state) {
    const hands = clone(state.hands)
    for (let i = 0; i < hands.length; i++) {
      const hand = hands[i]
      const total = blackjack.score(hand.cards)
      if (total > 21) hand.result = BUST
      if (total === 21 && hand.cards.length === 2) {
        hand.result = BLACKJACK
      }
      if (i > 0 && hands[0].result === BLACKJACK) {
        if (hand.result === BLACKJACK) hand.result = PUSH
        if (!hand.result) hand.result = LOSE
      }
    }
    state.hands = hands
  },
  compareHands (state, { _blackjack = blackjack }) {
    const hands = clone(state.hands)
    for (let i = 1; i < hands.length; i++) {
      const hand = hands[i]
      const total = _blackjack.score(hand.cards)
      const dealerTotal = _blackjack.score(hands[0].cards)
      if (dealerTotal === total) hand.result = PUSH
      if (dealerTotal > 21 && !hand.result) hand.result = WIN
      if (total > dealerTotal && !hand.result) hand.result = WIN
      if (dealerTotal > total && !hand.result) hand.result = LOSE
    }
    state.hands = hands
  },
  settleHands (state) {
    const hands = clone(state.hands)
    for (let i = 1; i < hands.length; i++) {
      const hand = hands[i]
      if (hand.result === BLACKJACK) {
        hand.bets = Array(3).fill(hand.bets[0])
      }
      if (hand.result === WIN) hand.bets.push(...hand.bets)
      if ([LOSE, BUST].includes(hand.result)) hand.bets = []
    }
    state.hands = hands
  },
  collectWinnings (state) {
    const hands = clone(state.hands)
    for (let i = 1; i < hands.length; i++) {
      const hand = hands[i]
      const winnings = hand.bets.reduce((a, b) => a + b, 0)
      state.bank += winnings
      hand.bets = []
    }
    state.hands = hands
  },
  revealDealerHand (state) {
    state.hands[0].cards[0].isFaceDown = false
  },
  advanceActiveHand (state) {
    if (state.activeHandIndex > 0) state.activeHandIndex--
    if (state.activeHandIndex === null) state.activeHandIndex = state.hands.length - 1
  },
  resetActiveHand (state) {
    state.activeHandIndex = null
  }
}
