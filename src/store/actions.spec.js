/* eslint-env jest */
import actions from './actions';

jest.useFakeTimers();
let commit = jest.fn();
let dispatch = jest.fn();

describe('actions', () => {
  beforeEach(() => {
    commit.mockClear();
    dispatch.mockClear();
  });
  describe('startNewGame ()', () => {
    const { startNewGame } = actions;
    it('is a function', () => {
      expect(startNewGame).toBeInstanceOf(Function);
    });
    it('commits hideTitleScreen mutation', () => {
      startNewGame({ commit, dispatch });
      expect(commit).toBeCalledWith('hideTitleScreen');
    });
    it('commits resetShoe mutation', () => {
      startNewGame({ commit, dispatch });
      expect(commit).toBeCalledWith('resetShoe');
    });
    it('commits resetBank mutation', () => {
      startNewGame({ commit, dispatch });
      expect(commit).toBeCalledWith('resetBank');
    });
    it('dispatches resetRound action', () => {
      startNewGame({ commit, dispatch });
      expect(dispatch).toBeCalledWith('resetRound');
    });
  });
  describe('resetRound ()', () => {
    const { resetRound } = actions;
    it('is a function', () => {
      resetRound({ commit, dispatch });
      expect(resetRound).toBeInstanceOf(Function);
    });
    it('commits resetHands mutation', () => {
      resetRound({ commit, dispatch });
      expect(commit).toBeCalledWith('resetHands');
    });
    it('dispatches reshuffleIfNeeded action', () => {
      resetRound({ commit, dispatch });
      expect(dispatch).toBeCalledWith('reshuffleIfNeeded');
    });
    it('commits bet mutation', () => {
      resetRound({ commit, dispatch });
      expect(commit).toBeCalledWith('bet');
    });
    it('dispatches dealRound action', () => {
      resetRound({ commit, dispatch });
      expect(dispatch).toBeCalledWith('dealRound');
    });
  });
  describe('reshuffleIfNeeded ()', () => {
    const { reshuffleIfNeeded } = actions;
    const state = {
      shoe: [],
      settings: {
        deckCount: 10,
        shuffleAfterPercent: 0.5
      }
    };
    it('is a function', () => {
      expect(reshuffleIfNeeded).toBeInstanceOf(Function);
    });
    it('commits resetShoe mutation if shoe has been reduced by shuffleAfterPercent', () => {
      state.shoe = Array(260).fill({});
      reshuffleIfNeeded({ commit, state });
      expect(commit).toBeCalledWith('resetShoe');
    });
    it('does not commit resetShoe mutation if more than shuffleAfterPercent remaining', () => {
      state.shoe = Array(261).fill({});
      reshuffleIfNeeded({ commit, state });
      expect(commit).toHaveBeenCalledTimes(0);
    });
  });
  describe('dealRound ()', () => {
    const { dealRound } = actions;
    const state = {
      hands: [
        { bets: [] },
        { bets: [1] }
      ]
    };
    it('is a function', () => {
      expect(dealRound).toBeInstanceOf(Function);
    });
    it('commits deal mutation four times in the correct hand order', () => {
      const expectedCalls = [1, 0, 1, 0].map(x => ['deal', { handIndex: x }]);
      dealRound({ commit, dispatch, state });
      jest.runAllTimers();
      expect(commit.mock.calls).toEqual(expectedCalls);
    });
    it('dispatches startRound action', () => {
      dealRound({ commit, dispatch, state });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('startRound');
    });
    it('does not commit or dispatch if no bet is placed', () => {
      state.hands[1].bets = [];
      dealRound({ commit, dispatch, state });
      jest.runAllTimers();
      expect(commit).toHaveBeenCalledTimes(0);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });
  describe('startRound ()', () => {
    const state = {
      hands: [{ result: undefined }]
    };
    const { startRound } = actions;
    it('is a function', () => {
      expect(startRound).toBeInstanceOf(Function);
    });
    it('commits checkForBustsAndBlackjacks', () => {
      startRound({ commit, dispatch, state });
      expect(commit).toBeCalledWith('checkForBustsAndBlackjacks');
    });
    it('dispatches startNextTurn action if no hand has a result', () => {
      startRound({ commit, dispatch, state });
      expect(dispatch).toBeCalledWith('startNextTurn');
    });
    it('commits revealDealerHand if a hand has a result', () => {
      state.hands[0].result = 1;
      startRound({ commit, dispatch, state });
      expect(commit).toBeCalledWith('revealDealerHand');
    });
    it('dispatches endRound if a hand has a result', () => {
      startRound({ commit, dispatch, state });
      expect(dispatch).toBeCalledWith('endRound');
    });
  });
  describe('startNextTurn ()', () => {
    const { startNextTurn } = actions;
    const state = { activeHandIndex: 0 };
    const getters = { activeHand: { cards: [{ value: 'A' }] } };
    it('is a function', () => {
      expect(startNextTurn).toBeInstanceOf(Function);
    });
    it('commits advanceActiveHand', () => {
      startNextTurn({ commit, dispatch, state, getters });
      expect(commit).toBeCalledWith('advanceActiveHand');
    });
    it('commits revealDealerHand if activeHandIndex is 0', () => {
      startNextTurn({ commit, dispatch, state, getters });
      jest.runAllTimers();
      expect(commit).toBeCalledWith('revealDealerHand');
    });
    it('dispatches makeDealerDecision if activeHandIndex is 0', () => {
      startNextTurn({ commit, dispatch, state, getters });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('makeDealerDecision');
    });
    it('dispatches hit if activeHand.cards.length is 1', () => {
      state.activeHandIndex = 1;
      startNextTurn({ commit, dispatch, state, getters });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('hit', expect.anything());
    });
    it('dispatches hit with onlyOnce set to true if card value is \'A\'', () => {
      startNextTurn({ commit, dispatch, state, getters });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('hit', { onlyOnce: true });
    });
    it('dispatches hit with onlyOnce set to false if card value is not \'A\'', () => {
      getters.activeHand.cards[0].value = 'K';
      startNextTurn({ commit, dispatch, state, getters });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('hit', { onlyOnce: false });
    });
  });
  describe('makeDealerDecision ()', () => {
    const { makeDealerDecision } = actions;
    const state = { hands: [{}, { result: 1 }, { result: 1 }] };
    const getters = { dealerTotal: 17 };
    it('is a function', () => {
      expect(makeDealerDecision).toBeInstanceOf(Function);
    });
    it('dispatches stand if all player hands have results', () => {
      makeDealerDecision({ commit, dispatch, state, getters });
      expect(dispatch).toBeCalledWith('stand');
    });
    it('dispatches stand if dealerTotal >= 17 and a player hand has no result', () => {
      state.hands[1].result = undefined;
      makeDealerDecision({ commit, dispatch, state, getters });
      expect(dispatch).toBeCalledWith('stand');
    });
    it('dispatches hit with isDealer set to true if dealerTotal < 17 and a player hand has no result', () => {
      getters.dealerTotal = 16;
      makeDealerDecision({ commit, dispatch, state, getters });
      expect(dispatch).toBeCalledWith('hit', { isDealer: true });
    });
  });
  describe('hit ()', () => {
    const { hit } = actions;
    const state = { activeHandIndex: 0 };
    const getters = { activeHand: { result: undefined } };
    const _blackjack = { score: () => 21 };
    it('is a function', () => {
      expect(hit).toBeInstanceOf(Function);
    });
    it('commits setIsDealing with isDealing set to true', () => {
      hit({ commit, dispatch, state, getters }, { _blackjack });
      expect(commit).toBeCalledWith('setIsDealing', { isDealing: true });
    });
    it('commits deal with handIndex set to state.activeHandIndex', () => {
      hit({ commit, dispatch, state, getters }, { _blackjack });
      expect(commit).toBeCalledWith('deal', { handIndex: state.activeHandIndex });
    });
    it('commits checkForBustsAndBlackjacks', () => {
      hit({ commit, dispatch, state, getters }, { _blackjack });
      jest.runAllTimers();
      expect(commit).toBeCalledWith('checkForBustsAndBlackjacks');
    });
    it('commits setIsDealing with isDealing set to false', () => {
      hit({ commit, dispatch, state, getters }, { _blackjack });
      jest.runAllTimers();
      expect(commit).toBeCalledWith('setIsDealing', { isDealing: false });
    });
    it('dispatches endTurn if activeHand has no result but has a score of 21', () => {
      hit({ commit, dispatch, state, getters }, { _blackjack });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('endTurn');
    });
    it('does not dispatch an action if activeHand has no result, is not 21, and isDealer is false', () => {
      _blackjack.score = () => 20;
      hit({ commit, dispatch, state, getters }, { _blackjack });
      jest.runAllTimers();
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
    it('dispatches makeDealerDecision if activeHand has no result, is not 21, and isDealer is true', () => {
      hit({ commit, dispatch, state, getters }, { _blackjack, isDealer: true });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('makeDealerDecision');
    });
    it('dispatches endTurn if activeHand has a result', () => {
      getters.activeHand.result = 1;
      hit({ commit, dispatch, state, getters }, { _blackjack });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('endTurn');
    });
    it('dispatches endTurn if onlyOnce is true', () => {
      getters.activeHand.result = undefined;
      hit({ commit, dispatch, state, getters }, { _blackjack, onlyOnce: true });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('endTurn');
    });
  });
  describe('doubleDown ()', () => {
    const { doubleDown } = actions;
    it('is a function', () => {
      expect(doubleDown).toBeInstanceOf(Function);
    });
    it('commits setIsDealing with isDealing set to true', () => {
      doubleDown({ commit, dispatch });
      expect(commit).toBeCalledWith('setIsDealing', { isDealing: true });
    });
    it('commits doubleBet', () => {
      doubleDown({ commit, dispatch });
      expect(commit).toBeCalledWith('doubleBet');
    });
    it('dispatches hit with onlyOnce set to true', () => {
      doubleDown({ commit, dispatch });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('hit', { onlyOnce: true });
    });
  });
  describe('split ()', () => {
    const { split } = actions;
    it('is a function', () => {
      expect(split).toBeInstanceOf(Function);
    });
    it('commits split', () => {
      split({ commit, dispatch });
      expect(commit).toBeCalledWith('split');
    });
    it('commits resetActiveHand', () => {
      split({ commit, dispatch });
      expect(commit).toBeCalledWith('resetActiveHand');
    });
    it('dispatches startNextTurn', () => {
      split({ commit, dispatch });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('startNextTurn');
    });
  });
  describe('stand ()', () => {
    const { stand } = actions;
    it('is a function', () => {
      expect(stand).toBeInstanceOf(Function);
    });
    it('dispatches endTurn', () => {
      stand({ dispatch });
      expect(dispatch).toBeCalledWith('endTurn');
    });
  });
  describe('endTurn ()', () => {
    const { endTurn } = actions;
    const state = { activeHandIndex: 0 };
    it('is a function', () => {
      expect(endTurn).toBeInstanceOf(Function);
    });
    it('dispatches endRound if activeHandIndex is 0', () => {
      endTurn({ dispatch, state });
      expect(dispatch).toBeCalledWith('endRound');
    });
    it('dispatches startNextTurn if activeHandIndex > 0', () => {
      state.activeHandIndex = 1;
      endTurn({ dispatch, state });
      expect(dispatch).toBeCalledWith('startNextTurn');
    });
  });
  describe('endRound ()', () => {
    const { endRound } = actions;
    it('is a function', () => {
      expect(endRound).toBeInstanceOf(Function);
    });
    it('commits resetActiveHand', () => {
      endRound({ commit, dispatch });
      expect(commit).toBeCalledWith('resetActiveHand');
    });
    it('commits compareHands', () => {
      endRound({ commit, dispatch });
      expect(commit).toBeCalledWith('compareHands');
    });
    it('commits settleHands', () => {
      endRound({ commit, dispatch });
      jest.runAllTimers();
      expect(commit).toBeCalledWith('settleHands');
    });
    it('commits collectWinnings', () => {
      endRound({ commit, dispatch });
      jest.runAllTimers();
      expect(commit).toBeCalledWith('collectWinnings');
    });
    it('dispatches resetRound', () => {
      endRound({ commit, dispatch });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith('resetRound');
    });
  });
});
