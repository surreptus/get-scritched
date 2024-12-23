export type Step = "betting" | "playing" | "scoring";
export type Suit = "clubs" | "diamonds" | "hearts" | "spades" | "no-trump";
export interface PlayerValue {
  player: string;
  value: number;
}
