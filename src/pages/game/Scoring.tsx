import { PlayerValue } from "./types";

interface ScoringProps {
  tricks: PlayerValue[];
  handleScore: (scores: PlayerValue[]) => void;
}

export function Scoring({ tricks, handleScore }: ScoringProps) {
  return (
    <div>
      {tricks.map(([player, tricks], index) => (
        <div key={index}>
          <input type="number" value={tricks} />
        </div>
      ))}
    </div>
  );
}
