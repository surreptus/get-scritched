export type Step = "betting" | "playing" | "scoring";
export type Suit = "clubs" | "diamonds" | "hearts" | "spades" | "no-trump";
export interface Player {
  name: string;
  motto: string;
  tricks: number;
  score: number;
}
