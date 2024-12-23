import { Field, Form, Formik } from "formik";
import { PlayerBet } from "./types";
import { Button } from "@chakra-ui/react";

interface BettingProps {
  players: string[];
  onBet: (bets: PlayerBet[]) => void;
}

interface FormValues {
  bets: PlayerBet[];
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
      <div key={player}>
        <label htmlFor={`bets.${player}`}>{player}</label>
        <Field type="number" name={`bets.${player}`} />
      </div>
    ));
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      <Form>
        {renderFields(players)}

        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}
