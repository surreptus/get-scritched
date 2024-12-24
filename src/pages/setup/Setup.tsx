import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import feather from "feather-icons";
import { EmptyState } from "@/components/ui/empty-state";
import { FieldArray, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { FiUsers } from "react-icons/fi";

export function Setup() {
  const navigate = useNavigate();

  async function handleSubmit() {
    await navigate("/game");
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
              <FieldArray name="players">
                {(helpers) => (
                  <Stack spaceY="2" direction="column">
                    <Stack direction="row" spaceX="2" alignItems="center">
                      <Input placeholder="Enter player name..." type="text" />

                      <Button
                        size="sm"
                        onClick={() => {
                          helpers.push("test");
                        }}
                      >
                        Add
                      </Button>
                    </Stack>

                    {values.players.length === 0 && (
                      <EmptyState
                        borderWidth="1px"
                        borderRadius={8}
                        icon={<FiUsers />}
                        title="No players added yet!"
                        description="Add the players that will be playing the game."
                      />
                    )}
                    {values.players.map((player) => (
                      <div>{player}</div>
                    ))}
                  </Stack>
                )}
              </FieldArray>

              <Text>When you're ready click start</Text>

              <Button colorPalette="green" type="submit">
                Start Game
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
}
