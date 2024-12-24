import { Form, Formik } from "formik";
import { PlayerValue } from "./types";
import { Button } from "@chakra-ui/react";
import { CheckboxCard } from "@/components/ui/checkbox-card";

function getInitialValues(tricks: PlayerValue[]) {
  console.log(tricks);
  return {};
}

interface ScoringProps {
  tricks: PlayerValue[];
  onScore: (scores: PlayerValue[]) => void;
}

export function Scoring({ tricks, onScore }: ScoringProps) {
  function handleSubmit() {
    onScore([]);
  }

  return (
    <Formik initialValues={getInitialValues(tricks)} onSubmit={handleSubmit}>
      <Form>
        {tricks.map((trick) => (
          <div key={trick.player}>
            <CheckboxCard>{trick.player}</CheckboxCard>
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}
