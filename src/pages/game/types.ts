export type Step = "bid" | "play" | "score";
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