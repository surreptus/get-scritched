import { Text, Container, Heading, Stack, Icon, Separator } from "@chakra-ui/react";
import { useState } from "react";
import { Betting } from "./Betting";
import { Playing } from "./Playing";
import { FormValues, Player, Round, Step, Suit } from "./types";
import { getNextStep, getNextSuit } from "./helpers";
import {
  PiClubFill,
  PiDiamondFill,
  PiHeartFill,
  PiNotEqualsFill,
  PiSpadeFill,
} from "react-icons/pi";
import { useSearchParams } from "react-router";
import { Form, Formik, FormikHelpers } from "formik";
import { object, array, number, boolean } from 'yup'
import { Scores } from "./Scores";
import { useTranslation } from "react-i18next";

const BASE_SCORE = 10;

function getInitialValues(players: Player[], descending: boolean) {
  return {
    plays: players.map(player => ({
      name: player.name,
      bid: 0,
      scritched: false
    })),
    descending: descending,
  }
}

function initializePlayers(players: string[]) {
  return players.map((player) => ({
    name: player,
    motto: "",
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
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [cards, setCards] = useState(1);
  const [step, setStep] = useState<Step>(getNextStep());
  const [suit, setSuit] = useState<Suit>(getNextSuit());
  const [descending, setDescending] = useState<boolean>(false)
  const [rounds, setRounds] = useState<Round[]>([])
  const [players, setPlayers] = useState<Player[]>(() => {
    const raw = params.get("players");

    if (!raw) {
      window.location.assign('/')
    } else {
      return initializePlayers(raw.split(","));
    }
  });

  const SUIT_ICON = {
    clubs: <PiClubFill />,
    diamonds: <PiDiamondFill />,
    hearts: <PiHeartFill />,
    spades: <PiSpadeFill />,
    "no-trump": <PiNotEqualsFill />,
  };

  const validationSchema = object({
    plays: array()
      .of(object({
        bid: number().max(cards).required(),
        scritched: boolean()
      }))
      .required()
      .test(
        "not-equal-total",
        "There are an equal number of bids as the total number of cards.",
        (value) => 
          step === 'bid'
            ? value.reduce((acc, current) => current.bid + acc, 0) !== cards
            : true
      )
      .test(
        "one-must-scritch",
        "At least one player must scritch each round",
        (value) => 
          step === 'play'
            ? value.reduce((acc: boolean, current) => current.scritched || acc, false)
            : true 
      ),
  })

  /**
   * for each of the players, we check whether they scritched or not. if they did
   * then we return their current score, if not we add the BASE_SCORE and the number
   * of tricks they bet they could take.
   *
   * @param tally
   * @returns
   */
  function handleSubmit(values: FormValues, helpers: FormikHelpers<FormValues>) {
    setRounds(rounds.concat({
      cards,
      suit,
      plays: values.plays
  }))

    if (values.descending) {
      setDescending(true)
      setCards(cards - 1)
    } else {
      setCards(cards + 1);
    }

    if (values.descending && cards === 1) {
      return setStep('score')
    }

    setSuit(getNextSuit(suit))

    helpers.resetForm()
    setStep('bid');
  }

  /**
   * render the current step of the game.
   *
   * @param step
   * @returns
   */
  function renderStep(step: Step) {
    switch (step) {
      case "bid":
        return <Betting onNext={() => setStep('play')} players={players} maxBid={cards} />;
      case "play":
        return <Playing onBack={() => setStep('bid')} players={players} />;
        case "score":
        return <Scores rounds={rounds} />
    }
  }

  return (
    <Container py="8" maxW="md">
      <Stack pb="8" direction="row" gap="4" justify="space-between">
        <Heading>{t(step)}</Heading>

        <Stack direction="row" alignItems="center">

          <Text fontSize="sm">{cards} {t('Card')}</Text>
          <Separator orientation="vertical" height="4" />
          <Text fontSize="sm">{t(suit)}</Text>

          <Icon size="lg">
            {SUIT_ICON[suit]}
          </Icon>
        </Stack>
      </Stack>

      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={getInitialValues(players, descending)}
        onSubmit={handleSubmit}
      >
        <Form>
          {renderStep(step)}
        </Form>
      </Formik>
    </Container>
  );
}
