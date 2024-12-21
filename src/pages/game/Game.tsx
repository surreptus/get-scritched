import { Box, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Betting } from "./Betting";
import { Playing } from "./Playing";
import { Scoring } from "./Scoring";
import { PlayerTally, Step, Suit } from "./types";
import { getNextStep, getNextSuit } from "./helpers";

const numberOfHands = 5;
const players = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "David" },
  { name: "Eve" },
];

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
  const [tally, setTally] = useState<PlayerTally>(new Map());

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

  function handleBet(bets: Bets) {
    setTally(bets);
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
        return <Betting players={tally.keys} onBet={setBets} />;
      case "playing":
        return <Playing onContinue={handleNext} />;
      case "scoring":
        return <Scoring bets={bets} onScore={handleScore} />;
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
