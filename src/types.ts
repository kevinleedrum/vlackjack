import { CardValue } from "@/blackjack";
import { Hand } from "@/blackjack";

export type CardSuit = '♠' | '♦' | '♣' | '♥';
export type CardRank = keyof typeof CardValue;

export type HandResult = 'win' | 'lose' | 'push' | 'blackjack' | 'bust';

export type Card = {
  rank: CardRank;
  suit: CardSuit;
  index: number;
};

export type Player = {
  name?: string;
  isDealer: boolean;
  bank: number;
  /** The player's hands (A player can have two hands after splitting) */
  hands: Hand[];
};

export type GameState = {
  /** The shoe of cards */
  shoe: Card[];
  /** The players in the game, including the dealer */
  players: Player[];
  /** The player whose turn it is */
  activePlayer: Player | null;
  /** The hand that is currently being played */
  activeHand: Hand | null;
  /** Whether the dealer is dealing cards (preventing interaction) */
  isDealing: boolean;
  /** Whether the dealer's hole card is face up */
  showDealerHoleCard: boolean;
  /** Whether the sound is muted */
  isMuted: boolean;
  /** Whether the game is over due to bankruptcy */
  isGameOver: boolean;
  /** The download progress of the sound files */
  soundLoadProgress: number;
}; 
