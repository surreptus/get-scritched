import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@chakra-ui/react";

interface PlayingProps {
  onContinue: () => void;
}

export function Playing({ onContinue }: PlayingProps) {
  return (
    <div>
      <h2>Playing</h2>
      <EmptyState title="No tricks played yet" />
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}
