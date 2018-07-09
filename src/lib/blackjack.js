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

function score (cardsToTotal, getHighTotal = false) {
  /* eslint-disable no-debugger */
  if (!cardsToTotal) debugger
  let cards = cardsToTotal.map(makeAcesLow)
  let lowTotal = cards.reduce(sumCards, 0)
  let highTotal = makeOneAceHigh(cards).reduce(sumCards, 0)
  if (highTotal <= 21 || getHighTotal) return highTotal
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

function canSplit (cards) {
  if (cards.length !== 2) return false
  return cards[0].value === cards[1].value
}

function getBasicStrategyMove ({ playerCards, dealerCards }) {
  if (score(playerCards) >= 19) return 'stand'
  if (canSplit(playerCards) && shouldSplit({ playerCards, dealerCards })) return 'split'
  if (isSoftHand(playerCards)) return getSoftMove({ playerCards, dealerCards })
  return getHardMove({ playerCards, dealerCards })
}

function shouldSplit ({ playerCards, dealerCards }) {
  const splits = {
    '2': ['2', '3', '4', '5', '6', '7'],
    '3': ['2', '3', '4', '5', '6', '7'],
    '4': ['5', '6'],
    '6': ['2', '3', '4', '5', '6'],
    '7': ['2', '3', '4', '5', '6', '7'],
    '9': ['2', '3', '4', '5', '6', '8', '9']
  }
  const { value } = playerCards[0]
  if (['A', '8'].includes(value)) return true
  if (value === '5') return false
  const dealerUpCard = dealerCards.find(card => !card.isFaceDown)
  return splits[value].includes(dealerUpCard.value)
}

function isSoftHand (cards) {
  if (!(cards.some(card => card.value === 'A'))) return false
  return score(cards, false) === score(cards, true)
}

function getSoftMove ({ playerCards, dealerCards }) {
  const moveTable = {
    13: '  hhhddhhhhh',
    14: '  hhhddhhhhh',
    15: '  hhdddhhhhh',
    16: '  hhdddhhhhh',
    17: '  hddddhhhhh',
    18: '  sddddsshhh'
  }
  const moves = {
    'h': 'hit',
    's': 'stand',
    'd': 'doubleDown'
  }
  const playerScore = score(playerCards)
  const dealerUpCard = dealerCards.find(card => !card.isFaceDown)
  const dealerUpValue = score([dealerUpCard])
  let move = moves[moveTable[playerScore].charAt(dealerUpValue)]
  if (move === 'doubleDown' && playerCards.length > 2) return 'hit'
  return move
}

function getHardMove ({ playerCards, dealerCards }) {
  const moveTable = {
    9: '  hdddhhhhhh',
    10: '  ddddddddhh',
    11: '  dddddddddh',
    12: '  hhssshhhhh',
    13: '  ssssshhhhh',
    14: '  ssssshhhhh',
    15: '  ssssshhhhh',
    16: '  ssssshhhhh'
  }
  const moves = {
    'h': 'hit',
    's': 'stand',
    'd': 'doubleDown'
  }
  const playerScore = score(playerCards)
  if (playerScore <= 8) return 'hit'
  if (playerScore >= 17) return 'stand'
  const dealerUpCard = dealerCards.find(card => !card.isFaceDown)
  const dealerUpValue = score([dealerUpCard])
  let move = moves[moveTable[playerScore].charAt(dealerUpValue)]
  if (move === 'doubleDown' && playerCards.length > 2) return 'hit'
  return move
}

export default { createShoe, createDeck, shuffle, score, results, getBasicStrategyMove }
