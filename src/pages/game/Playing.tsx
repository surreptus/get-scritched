import { Button } from "@chakra-ui/react";

interface PlayingProps {
  onContinue: () => void;
}

export function Playing({ onContinue }: PlayingProps) {
  return (
    <div>
      <h2>Playing</h2>
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}
