export type Step = "betting" | "playing" | "scoring";
export type Suit = "clubs" | "diamonds" | "hearts" | "spades" | "no-trump";
export type PlayerTally = Map<string, { score: number; tricks: number }>;
export interface PlayerBet {
  player: string;
  bet: number;
}
