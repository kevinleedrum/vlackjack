const FACE_VALUES = {
  'a': 1,
  'J': 10,
  'Q': 10,
  'K': 10,
  'A': 11
}

const results = {
  BUST: 1,
  WIN: 2,
  LOSE: 3,
  PUSH: 4,
  BLACKJACK: 5
}

function createShoe (deckCount = 1) {
  let shoe = []
  for (let i = 0; i < deckCount; i++) {
    shoe = shoe.concat(shuffle(createDeck()))
  }
  return shoe
}

function createDeck () {
  let deck = []
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const suits = ['C', 'D', 'H', 'S']
  values.forEach(value => {
    suits.forEach(suit => {
      deck.push({ value, suit })
    })
  })
  return deck
}

function shuffle (cardsToShuffle) {
  let cards = cardsToShuffle.slice()
  for (let i = cards.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const randomCard = cards[randomIndex]
    cards[randomIndex] = cards[i]
    cards[i] = randomCard
  }
  return cards
}

function score (cardsToTotal) {
  let cards = cardsToTotal.map(makeAcesLow)
  let lowTotal = cards.reduce(sumCards, 0)
  let highTotal = makeOneAceHigh(cards).reduce(sumCards, 0)
  if (highTotal <= 21) return highTotal
  return lowTotal
}

function sumCards (a, b) {
  return a + getNumericalValue(b)
}

function getNumericalValue (card) {
  if (FACE_VALUES[card.value]) return FACE_VALUES[card.value]
  return parseInt(card.value)
}

function makeAcesLow (cardToModify) {
  let card = Object.assign({}, cardToModify)
  if (card.value === 'A') card.value = 'a'
  return card
}

function makeOneAceHigh (cardsToModify) {
  let cards = cardsToModify.slice()
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value === 'a') {
      cards[i].value = 'A'
      break
    }
  }
  return cards
}

export default { createShoe, createDeck, shuffle, score, results }
