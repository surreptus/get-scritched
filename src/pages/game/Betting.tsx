import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, HStack, Input, Text, Stack } from "@chakra-ui/react";
import { Player } from "./types";
import { Avatar } from "@/components/ui/avatar";
import { object, array, number } from "yup";
import { Alert } from "@/components/ui/alert";

interface BettingProps {
  players: Player[];
  total: number;
  onBet: (bets: number[]) => void;
}

interface FormValues {
  tricks: number[];
}

export function Betting({ players, onBet, total }: BettingProps) {
  function handleSubmit(values: FormValues) {
    onBet(values.tricks);
  }

  const validationSchema = object({
    tricks: array()
      .of(number().required())
      .required()
      .test(
        "not-equal-total",
        "There are an equal number of bets as the total number of cards",
        (value) => value.reduce((acc, current) => current + acc) !== total
      ),
  });

  function renderFields(players: Player[]) {
    return players.map((player, index) => {
      const fieldName = `tricks[${index.toString()}]`;

      return (
        <HStack key={player.name} gap="4">
          <Avatar colorPalette="purple" name={player.name} size="md" />

          <Stack
            flex="1"
            alignItems="center"
            justify="space-between"
            direction="row"
            gap="2"
          >
            <Text flex="1 auto" fontWeight="medium">
              {player.name}
            </Text>

            <Field width="6rem" as={Input} type="number" name={fieldName} />
          </Stack>
        </HStack>
      );
    });
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        tricks: players.map(() => 0),
      }}
    >
      <Form>
        <Stack spaceY="2" direction="column">
          {renderFields(players)}

          <ErrorMessage name="tricks">
            {(message) => (
              <Alert status="error" title="Someone needs to get scritched!">
                {message}
              </Alert>
            )}
          </ErrorMessage>

          <Button colorPalette="purple" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}
