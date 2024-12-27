export type Step = "bid" | "play" | "score";

/**
 * t('clubs', 'Clubs')
 * t('diamonds', 'Diamonds')
 * t('hearts', 'Hearts')
 * t('spades', 'Spades')
 * t('no-trump', 'No Trump')
 */
export type Suit = "clubs" | "diamonds" | "hearts" | "spades" | "no-trump";
export interface Player {
  name: string;
  motto: string;
}

export interface Round {
  cards: number;
  suit: Suit;
  plays: Play[];
}

export interface Play {
  name: string;
  bid: number;
  scritched: boolean;
}

export interface FormValues {
  plays: Play[];
  descending: boolean;
}