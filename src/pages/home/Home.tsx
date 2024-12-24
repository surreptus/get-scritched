import { Button } from "@chakra-ui/react";
import { Link } from "react-router";

export function Home() {
  return (
    <div>
      <h1>Welcome to the home page!</h1>

      <Button asChild colorScheme="blue">
        <Link to="/setup">Start Game</Link>
      </Button>
    </div>
  );
}
