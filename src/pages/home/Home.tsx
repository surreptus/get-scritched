import { Button, Heading, Text, Container, VStack } from "@chakra-ui/react";
import { Link } from "react-router";

export function Home() {
  return (
    <Container py='12' maxW='md'>
      <VStack alignItems='center'>
      <Heading>🃏 Get Scritched!</Heading>

      <Text>
        Scritch is a card game where you bet how many hands (tricks) you can take each round. Best enjoyed with lots of coffee.
      </Text>

      <Button asChild colorScheme="blue">
        <Link to="/setup">Start Game</Link>
      </Button>
      </VStack>
    </Container>
  );
}
