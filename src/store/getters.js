import blackjack from '@/lib/blackjack'

export default {
  activeHand (state) {
    return state.hands[state.activeHandIndex]
  },
  dealerTotal (state) {
    if (!state.hands.length) return
    return blackjack.score(state.hands[0].cards)
  },
  isSplit (state) {
    return state.hands.length > 2
  },
  canSplit (state) {
    if (state.bank < state.settings.minimumBet) return false
    if (!state.hands.length || !state.activeHandIndex) return false
    if (state.hands.length > 2) return false
    const cards = state.hands[state.activeHandIndex].cards
    return cards.length === 2 && cards[0].value === cards[1].value
  },
  canDoubleDown (state) {
    if (state.bank < state.settings.minimumBet) return false
    if (!state.hands.length || !state.activeHandIndex) return false
    const cards = state.hands[state.activeHandIndex].cards
    return cards.length === 2
  },
  basicStrategyMove (state) {
    if (!state.hands.length || !state.activeHandIndex || !state.hands[state.activeHandIndex]) return
    const playerCards = state.hands[state.activeHandIndex].cards
    const dealerCards = state.hands[0].cards
    return blackjack.getBasicStrategyMove({ playerCards, dealerCards })
  },
  isGameOver (state) {
    const cards = state.hands.map(hand => hand.cards.length).reduce((a, b) => a + b)
    return state.bank < state.settings.minimumBet && !cards && !state.isDealing
  }
}
