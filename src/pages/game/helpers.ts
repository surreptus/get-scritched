import { Suit, Step, Round } from "./types";

/**
 * returns the next step in the game based on the current step
 * @param step the current step in the game
 * @returns
 */
export function getNextStep(step?: Step): Step {
  switch (step) {
    case "bid":
      return "play";
    case "play":
    default:
      return "bid";
  }
}

/**
 * returns the next suit in the game based on the current suit
 * @param suit the current suit in the game
 * @returns
 */
export function getNextSuit(suit?: Suit): Suit {
  switch (suit) {
    case "clubs":
      return "diamonds";
    case "diamonds":
      return "hearts";
    case "hearts":
      return "spades";
    case "spades":
      return "no-trump";
    case "no-trump":
      return "clubs";
    default:
      return "clubs";
  }
}

export function tallyScores(rounds: Round[]): Record<string, number> {
  return rounds.reduce((acc, curr) => {
    return curr.plays.reduce((totals:Record<string, number>, play) => {
      if (play.scritched) {
        return totals
      }

      if (totals[play.name]) {
        totals[play.name] += play.bid + 10
      } else {
        totals[play.name] = play.bid + 10
      }

      return totals
    }, acc)
  }, {})
}