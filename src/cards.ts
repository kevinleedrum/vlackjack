import type { Card, CardRank } from './types'

export const CardValue = {
  A: 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 10,
  Q: 10,
  K: 10,
} as const

export const CardSuits = ['♠', '♦', '♣', '♥'] as const

export function generateShoe(numberOfDecks: number) {
  const shoe: Card[] = []
  for (let i = 0; i < numberOfDecks; i++) {
    for (const card of generateDeck()) {
      shoe.push(card)
    }
  }
  return shuffle(shoe)
}

export function generateDeck() {
  const deck: Card[] = []
  let index = 0
  for (const rank of Object.keys(CardValue) as CardRank[]) {
    for (const suit of CardSuits) {
      deck.push({ rank, suit, index: index++ })
    }
  }
  return deck
}

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
