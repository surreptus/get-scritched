import { Field, Form, Formik } from "formik";
import { Player } from "./types";
import { Button } from "@chakra-ui/react";
import { CheckboxCard } from "@/components/ui/checkbox-card";

function getInitialValues(players: Player[]) {
  return {
    scritches: players.map(() => false),
  };
}

interface ScoringProps {
  players: Player[];
  onScore: (scritches: boolean[]) => void;
}

export function Scoring({ players, onScore }: ScoringProps) {
  function handleSubmit() {
    onScore([]);
  }

  return (
    <Formik initialValues={getInitialValues(players)} onSubmit={handleSubmit}>
      <Form>
        {players.map((player, index) => (
          <Field
            key={player.name}
            as={CheckboxCard}
            name={`scritches[${index.toString()}]`}
          >
            {player.name}
          </Field>
        ))}

        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}
