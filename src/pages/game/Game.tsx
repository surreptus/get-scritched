import { Box, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Betting } from "./Betting";
import { Playing } from "./Playing";
import { Scoring } from "./Scoring";
import { PlayerValue, Step, Suit } from "./types";
import { getNextStep, getNextSuit } from "./helpers";

const players = ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace"];

/**
 * on the play page a game is either created or loaded from the database.
 * there are multiple modes of play:
 * - betting
 * - playing
 * - scoring
 *
 */
export function Game() {
  const [step, setStep] = useState<Step>(getNextStep());
  const [suit, setSuit] = useState<Suit>(getNextSuit());
  const [tricks, setTricks] = useState<PlayerValue[]>([]);

  /**
   * progress the game through the screens. if the current step is scoring
   * then we also need to progress the suit.
   */
  function handleNext() {
    if (step === "scoring") {
      setSuit(getNextSuit(suit));
    }

    setStep(getNextStep(step));
  }

  /**
   * sets the bets for the players and progresses the game to the next step.
   *
   * @param bets
   */
  function handleBet(bets: PlayerValue[]) {
    setTricks(bets);
    handleNext();
  }

  /**
   *
   * @param tally
   * @returns
   */
  function handleScore(tally: PlayerValue[]) {
    console.log(tally);
  }

  /**
   * render the current step of the game.
   *
   * @param step
   * @returns
   */
  function renderStep(step: Step) {
    switch (step) {
      case "betting":
        return <Betting players={players} onBet={handleBet} />;
      case "playing":
        return <Playing onContinue={handleNext} />;
      case "scoring":
        return <Scoring tricks={tricks} onScore={handleScore} />;
    }
  }

  return (
    <div>
      <Heading>Play</Heading>

      {renderStep(step)}

      <Box>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </div>
  );
}
