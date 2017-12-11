/* eslint-env jest */
import mutations from './mutations';

const state = {
  settings: {
    deckCount: 6,
    startingBank: 100,
    minimumBet: 1
  },
  bank: 0,
  hands: [],
  activeHandIndex: 1,
  isDealing: false
};

describe('mutations', () => {
  describe('hideTitleScreen ()', () => {
    const { hideTitleScreen } = mutations;
    it('is a function', () => {
      expect(hideTitleScreen).toBeInstanceOf(Function);
    });
    it('sets isTitleShowing to false', () => {
      hideTitleScreen(state);
      expect(state.isTitleShowing).toEqual(false);
    });
  });
  describe('resetShoe ()', () => {
    const { resetShoe } = mutations;
    const _blackjack = {
      createShoe: jest.fn().mockReturnValue(['test']),
      shuffle: jest.fn()
    };
    it('is a function', () => {
      expect(resetShoe).toBeInstanceOf(Function);
    });
    it('calls blackjack.createShoe with settings.deckCount', () => {
      resetShoe(state, { _blackjack });
      expect(_blackjack.createShoe).toBeCalledWith(state.settings.deckCount);
    });
    it('calls blackjack.shuffle with created state.shoe', () => {
      resetShoe(state, { _blackjack });
      expect(_blackjack.shuffle).toBeCalledWith(['test']);
    });
  });
  describe('resetBank ()', () => {
    const { resetBank } = mutations;
    it('is a function', () => {
      expect(resetBank).toBeInstanceOf(Function);
    });
    it('sets bank to settings.startingBank', () => {
      resetBank(state);
      expect(state.bank).toEqual(state.settings.startingBank);
    });
  });
  describe('resetHands ()', () => {
    const { resetHands } = mutations;
    it('is a function', () => {
      expect(resetHands).toBeInstanceOf(Function);
    });
    it('removes cards from hands', () => {
      resetHands(state);
      expect(state.hands[0].cards).toEqual([]);
      expect(state.hands[1].cards).toEqual([]);
    });
    it('removes results from hands', () => {
      resetHands(state);
      expect(state.hands[0].result).toBeUndefined();
      expect(state.hands[1].result).toBeUndefined();
    });
    it('removes bets from hands', () => {
      resetHands(state);
      expect(state.hands[0].bets).toEqual([]);
      expect(state.hands[1].bets).toEqual([]);
    });
    it('removes third (split) hand if present', () => {
      state.hands = [{}, {}, {}];
      resetHands(state);
      expect(state.hands.length).toBe(2);
    });
  });
  describe('bet ()', () => {
    const { bet } = mutations;
    it('is a function', () => {
      expect(bet).toBeInstanceOf(Function);
    });
    it('does not make changes if bank is less than minimumBet', () => {
      state.bank = 0;
      const stateSnapshot = JSON.parse(JSON.stringify(state));
      bet(state);
      expect(state).toEqual(stateSnapshot);
    });
    it('decreases bank by minimumBet', () => {
      state.bank = 100;
      bet(state);
      expect(state.bank).toEqual(100 - state.settings.minimumBet);
    });
    it('sets hands[1].bets[0] to the minimumBet', () => {
      state.hands[1].bets = [];
      bet(state);
      expect(state.hands[1].bets[0]).toEqual(state.settings.minimumBet);
    });
  });
  describe('doubleBet ()', () => {
    const { doubleBet } = mutations;
    it('is a function', () => {
      expect(doubleBet).toBeInstanceOf(Function);
    });
    it('decreases bank by current active hand bet', () => {
      state.bank = 100;
      state.hands[1].bets = [5];
      doubleBet(state);
      expect(state.bank).toEqual(95);
    });
    it('copies active hand\'s bets[0] to bets[1]', () => {
      state.hands[1].bets = [5];
      doubleBet(state);
      expect(state.hands[1].bets[1]).toEqual(state.hands[1].bets[0]);
    });
  });
  describe('deal ()', () => {
    const { deal } = mutations;
    beforeEach(() => {
      state.shoe = [{ value: 2 }, { value: 3 }, { value: 4 }];
      state.hands = [{ cards: [] }, { cards: [] }];
    });
    it('is a function', () => {
      expect(deal).toBeInstanceOf(Function);
    });
    it('shifts card from shoe into target hand\'s cards', () => {
      deal(state, { handIndex: 0 });
      expect(state.shoe.length).toBe(2);
      expect(state.hands[0].cards[0].value).toEqual(2);
    });
    it('sets isFaceDown property of card to true if handIndex = 0 and is first card in hand', () => {
      deal(state, { handIndex: 0 });
      expect(state.hands[0].cards[0].isFaceDown).toEqual(true);
    });
    it('sets isFaceDown property of card to false if handIndex = 0 and not first card in hand', () => {
      state.hands[0].cards = [{ value: 2 }];
      deal(state, { handIndex: 0 });
      expect(state.hands[0].cards[1].isFaceDown).toEqual(false);
    });
    it('sets isFaceDown property of card to false if handIndex > 0', () => {
      deal(state, { handIndex: 1 });
      expect(state.hands[1].cards[0].isFaceDown).toEqual(false);
    });
  });
  describe('setIsDealing ()', () => {
    const { setIsDealing } = mutations;
    it('is a function', () => {
      expect(setIsDealing).toBeInstanceOf(Function);
    });
    it('sets isDealing to the passed value', () => {
      setIsDealing(state, { isDealing: true });
      expect(state.isDealing).toEqual(true);
    });
  });
  describe('split ()', () => {
    const { split } = mutations;
    beforeEach(() => {
      const hand = {
        cards: [{ value: 8 }, { value: 9 }],
        bets: [1]
      };
      state.hands = [{}, hand];
    });
    it('is a function', () => {
      expect(split).toBeInstanceOf(Function);
    });
    it('creates a third hand', () => {
      split(state);
      expect(state.hands.length).toEqual(3);
    });
    it('moves one card from hands[1] to the new hand', () => {
      split(state);
      expect(state.hands[1].cards[0].value).toEqual(8);
      expect(state.hands[1].cards.length).toBe(1);
      expect(state.hands[2].cards[0].value).toEqual(9);
    });
    it('decreases the bank by the current hand bet', () => {
      state.bank = 100;
      split(state);
      expect(state.bank).toEqual(99);
    });
    it('copies the current hand bet to the new hand', () => {
      split(state);
      expect(state.hands[2].bets).toEqual(state.hands[1].bets);
    });
  });
});
