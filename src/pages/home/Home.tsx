import { Button, Heading, Text, Container, VStack } from "@chakra-ui/react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <Container py='12' maxW='md'>
      <VStack alignItems='center'>
        <Heading>🃏 {t('Get Scritched')}</Heading>

        <Text>
          {t('Scritch is a card game where you bet how many hands (tricks) you can take each round. Best enjoyed with lots of coffee.')}
        </Text>

        <Button asChild colorScheme="blue">
          <Link to="/setup">{t('Start Game')}</Link>
        </Button>
      </VStack>
    </Container>
  );
}
