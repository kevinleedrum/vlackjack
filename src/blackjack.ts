import type { Card, CardRank } from './types';

export const CardValue = {
  'a': 1, // low ace
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
  A: 11, // high ace
} as const;

export const CardSuits = ['♠', '♦', '♣', '♥'] as const;

export function generateShoe(numberOfDecks: number) {
  const shoe: Card[] = [];
  for (let i = 0; i < numberOfDecks; i++) {
    for (const card of generateDeck()) {
      shoe.push(card);
    }
  }
  return shuffle(shoe);
}

export function generateDeck() {
  const deck: Card[] = [];
  let index = 0;
  for (const rank of Object.keys(CardValue)) {
    if (rank === 'a') continue; // Skip low ace
    for (const suit of CardSuits) {
      deck.push({ rank: rank as CardRank, suit, index });
      index++;
    }
  }
  return deck;
}

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export class Hand {
  id: number;
  cards: Card[];
  bet: number;
  result?: 'win' | 'lose' | 'push' | 'bust' | 'blackjack';

  constructor(bet = 0) {
    this.id = new Date().getTime() + Math.random();
    this.cards = [];
    this.bet = bet;
  }

  reset() {
    this.cards = [];
    this.bet = 0;
    this.result = undefined;
  }
}

export function getHandTotal(cards: Card[], getHighTotal = false) {
  const highTotal = cards.map(makeOneAceHigh).reduce((sum, card) => sum + CardValue[card.rank as CardRank], 0);
  if (highTotal <= 21 || getHighTotal) return highTotal;
  return cards.map(makeAcesLow).reduce((sum, card) => sum + CardValue[card.rank as CardRank], 0);
}

function makeAcesLow(card: Card) {
  return card.rank === 'A' ? { ...card, rank: 'a' } : card;
}

function makeOneAceHigh(card: Card, i: number, cards: Card[]) {
  if (card.rank !== 'A') return card;
  if (i === cards.findIndex(c => c.rank === 'A')) return { ...card, rank: 'A' };
  return { ...card, rank: 'a' };
}
