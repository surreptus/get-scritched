import {
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { FiUsers } from "react-icons/fi";
import { FormValues } from "./types";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { PiXCircle } from "react-icons/pi";

export function Setup() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");

  async function handleSubmit(values: FormValues) {
    const params = new URLSearchParams();

    params.set("players", values.players.join(","));
    params.set("maxCards", values.maxCards.toString());

    await navigate("/game?" + params.toString());
  }

  /**
   *
   * @param helpers adds new players to the list of players.
   * @returns
   */
  function renderAddPlayer(helpers: FieldArrayRenderProps) {
    return (
      <Stack direction="row" spaceX="2" alignItems="center">
        <Input
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (draft !== "") {
                helpers.push(draft);
                setDraft("");
              }
            }
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setDraft(event.target.value);
          }}
          value={draft}
          placeholder="Enter player name..."
          type="text"
        />

        <Button
          size="sm"
          onClick={() => {
            helpers.push(draft);
            setDraft("");
          }}
        >
          Add
        </Button>
      </Stack>
    );
  }

  /**
   *
   * @param players list of player names
   * @param helpers render array helpers to remove a player
   * @returns
   */
  function renderPlayers(players: string[], helpers: FieldArrayRenderProps) {
    return players.map((player, index) => (
      <HStack key={player} gap="4">
        <Avatar colorPalette="purple" name={player} size="md" />

        <Stack
          flex="1"
          alignItems="center"
          justify="space-between"
          direction="row"
          gap="2"
        >
          <Text flex="1 auto" fontWeight="medium">
            {player}
          </Text>

          <IconButton variant="ghost" onClick={() => helpers.remove(index)}>
            <PiXCircle />
          </IconButton>
        </Stack>
      </HStack>
    ));
  }

  return (
    <Container py="8" maxW="md">
      <Stack spaceY="4">
        <Heading>Setup</Heading>

        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            players: [],
            maxCards: 1,
          }}
        >
          {({ values }) => (
            <Form>
              <Stack direction="column" spaceY="2">
                <FieldArray name="players">
                  {(helpers) => (
                    <Stack spaceY="2" direction="column">
                      {renderAddPlayer(helpers)}

                      {values.players.length === 0 && (
                        <EmptyState
                          borderWidth="1px"
                          borderRadius={8}
                          icon={<FiUsers />}
                          title="No players added yet!"
                          description="Add the players that will be playing the game."
                        />
                      )}

                      {renderPlayers(values.players, helpers)}
                    </Stack>
                  )}
                </FieldArray>

                <Field
                  as={Input}
                  type="number"
                  placeholder="0"
                  name="maxCards"
                />

                <Button colorPalette="green" type="submit">
                  Start Game
                </Button>

                <Text textAlign="center" textStyle="sm">
                  When you're ready, click start!
                </Text>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
}
