import { Text, Container, Heading, Stack, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { Betting } from "./Betting";
import { Playing } from "./Playing";
import { Scoring } from "./Scoring";
import { Player, Step, Suit } from "./types";
import { getNextStep, getNextSuit } from "./helpers";
import {
  PiClubFill,
  PiDiamondFill,
  PiHeartFill,
  PiNotEqualsFill,
  PiSpadeFill,
} from "react-icons/pi";
import { useSearchParams } from "react-router";

const BASE_SCORE = 10;

function initializePlayers(players: string[]) {
  return players.map((player) => ({
    name: player,
    motto: "",
    score: 0,
    tricks: 0,
  }));
}

/**
 * on the play page a game is either created or loaded from the database.
 * there are multiple modes of play:
 * - betting
 * - playing
 * - scoring
 *
 */
export function Game() {
  const [params] = useSearchParams();
  const [round, setRound] = useState(1);
  const [step, setStep] = useState<Step>(getNextStep());
  const [suit, setSuit] = useState<Suit>(getNextSuit());
  const [players, setPlayers] = useState<Player[]>(() => {
    const raw = params.get("players");

    if (!raw) throw new Error("you must have players defined");

    return initializePlayers(raw.split(","));
  });

  const SUIT_ICON = {
    clubs: <PiClubFill />,
    diamonds: <PiDiamondFill />,
    hearts: <PiHeartFill />,
    spades: <PiSpadeFill />,
    "no-trump": <PiNotEqualsFill />,
  };

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
  function handleBet(tricks: number[]) {
    setPlayers(
      players.map((player, index) => ({
        ...player,
        tricks: tricks[index],
      }))
    );

    handleNext();
  }

  /**
   * for each of the players, we check whether they scritched or not. if they did
   * then we return their current score, if not we add the BASE_SCORE and the number
   * of tricks they bet they could take.
   *
   * @param tally
   * @returns
   */
  function handleScore(scritches: boolean[]) {
    setPlayers(
      players.map((player, index) => ({
        ...player,
        score: scritches[index]
          ? player.score
          : player.score + player.tricks + BASE_SCORE,
        tricks: 0,
      }))
    );

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
        return <Betting total={1} players={players} onBet={handleBet} />;
      case "playing":
        return <Playing onContinue={handleNext} />;
      case "scoring":
        return <Scoring players={players} onScore={handleScore} />;
    }
  }

  return (
    <Container py="8" maxW="md">
      <Stack pb="8" direction="row" gap="4" justify="space-between">
        <Heading>Round: {round}</Heading>
        <Stack direction="row" alignItems="center">
          <Text fontSize="sm">{suit}</Text>

          <Icon size="lg" color="red">
            {SUIT_ICON[suit]}
          </Icon>
        </Stack>
      </Stack>

      {renderStep(step)}
    </Container>
  );
}
