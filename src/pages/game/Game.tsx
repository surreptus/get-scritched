import { Text, Container, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Betting } from "./Betting";
import { Playing } from "./Playing";
import { Scoring } from "./Scoring";
import { PlayerValue, Step, Suit } from "./types";
import { getNextStep, getNextSuit } from "./helpers";
import clubs from "../../assets/club.svg";
import diamonds from "../../assets/diamond.svg";
import hearts from "../../assets/heart.svg";
import spades from "../../assets/spade.svg";

const players = ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank", "Grace"];
const SUIT_ICON = {
  clubs,
  diamonds,
  hearts,
  spades,
  "no-trump": "",
};

/**
 * on the play page a game is either created or loaded from the database.
 * there are multiple modes of play:
 * - betting
 * - playing
 * - scoring
 *
 */
export function Game() {
  const [round, setRound] = useState(1);
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
    setRound(round + 1);
    handleNext();
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
    <Container py="8" maxW="md">
      <Stack pb="8" direction="row" spaceX="2" justify="space-between">
        <Heading>Round: {round}</Heading>
        <Stack direction="row" alignItems="center">
          <img width="24px" height="auto" src={SUIT_ICON[suit]} alt={suit} />
          <Text>{suit}</Text>
        </Stack>
      </Stack>

      {renderStep(step)}
    </Container>
  );
}
