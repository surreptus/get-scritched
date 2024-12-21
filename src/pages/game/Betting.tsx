import { Field, Form, Formik } from "formik";
import { PlayerBet } from "./types";

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

  return (
    <Formik onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      <Form>
        {players.map((player, index) => (
          <div key={player}>
            <label htmlFor={`bets.${player}`}>{player}</label>

            <Field type="number" name={`bets.${index}`} />
          </div>
        ))}
      </Form>
    </Formik>
  );
}
