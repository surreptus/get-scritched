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
import { FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import { Field as LabelField } from '@/components/ui/field'
import { useNavigate } from "react-router";
import { FiUsers } from "react-icons/fi";
import { FormValues } from "./types";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { PiXCircle } from "react-icons/pi";
import { object, string, array } from 'yup'

const validationSchema = object({
  players: array()
    .of(string().required())
    .min(1)
})

export function Setup() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");

  async function handleSubmit(values: FormValues) {
    const params = new URLSearchParams();

    params.set("players", values.players.join(","));

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
          validationSchema={validationSchema}
          initialValues={{
            players: [],
          }}
        >
          {({ values }) => (
            <Form>
              <Stack direction="column" spaceY="2">
                <LabelField label='Players' helperText="Everyone who's playing the game">
                  <FieldArray name="players">
                    {(helpers) => (
                      <Stack width='100%' spaceY="2" direction="column">
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
                </LabelField>

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
