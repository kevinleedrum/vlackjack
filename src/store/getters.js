import blackjack from '@/lib/blackjack'

export default {
  activeHand (state) {
    return state.hands[state.activeHandIndex]
  },
  dealerTotal (state) {
    return blackjack.score(state.hands[0].cards)
  },
  isSplit (state) {
    return state.hands.length > 2
  },
  canSplit (state) {
    if (!state.hands.length || !state.activeHandIndex) return false
    if (state.hands.length > 2) return false
    const cards = state.hands[state.activeHandIndex].cards
    return cards.length === 2 && cards[0].value === cards[1].value
  },
  canDoubleDown (state) {
    if (!state.hands.length || !state.activeHandIndex) return false
    const cards = state.hands[state.activeHandIndex].cards
    return cards.length === 2
  }
}
