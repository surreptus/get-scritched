import { Field, Form, Formik } from "formik";
import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";
import { PlayerValue } from "./types";

interface BettingProps {
  players: string[];
  onBet: (bets: PlayerValue[]) => void;
}

interface FormValues {
  bets: PlayerValue[];
}

const INITIAL_VALUES: FormValues = {
  bets: [],
};

export function Betting({ players, onBet }: BettingProps) {
  function handleSubmit(values: FormValues) {
    onBet(values.bets);
  }

  function renderFields(players: string[]) {
    return players.map((player) => (
      <Flex key={player}>
        <Box flex="0 90%">
          <label htmlFor={`bets.${player}`}>{player}</label>
        </Box>

        <Field width="6rem" as={Input} type="number" name={`bets.${player}`} />
      </Flex>
    ));
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      <Form>
        <Stack spaceY="2" direction="column">
          {renderFields(players)}

          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
    </Formik>
  );
}
