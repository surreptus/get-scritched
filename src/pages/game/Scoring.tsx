import { Form, Formik } from "formik";
import { PlayerValue } from "./types";

function getInitialValues(tricks: PlayerValue[]) {
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
            <input type="number" value={trick.value} />
          </div>
        ))}
      </Form>
    </Formik>
  );
}
