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
import { useTranslation } from "react-i18next";

const validationSchema = object({
  players: array()
    .of(string().required())
    .min(1)
})

export function Setup() {
  const { t } = useTranslation();
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
          placeholder={t("Enter player name...")}
          type="text"
        />

        <Button
          size="sm"
          onClick={() => {
            helpers.push(draft);
            setDraft("");
          }}
        >
          {t("Add")}
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
        <div>
        <Heading>{t("Setup")}</Heading>
        <Text fontSize='sm'>
          {t('Add everyone who is playing the game.')}
        </Text>
        </div>

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
                <LabelField label={t('Players')} helperText={t("Everyone who's playing the game")}>
                  <FieldArray name="players">
                    {(helpers) => (
                      <Stack width='100%' spaceY="2" direction="column">
                        {renderAddPlayer(helpers)}

                        {values.players.length === 0 && (
                          <EmptyState
                            borderWidth="1px"
                            borderRadius={8}
                            icon={<FiUsers />}
                            title={t("No players added yet!")}
                            description={t("Enter a name in the input, and click add or enter.")}
                          />
                        )}

                        {renderPlayers(values.players, helpers)}
                      </Stack>
                    )}
                  </FieldArray>
                </LabelField>

                <HStack>
                  <Button alignSelf='flex-start' colorPalette="green" type="submit">
                    {t("Start Game")}
                  </Button>

                  <Text fontSize="sm">
                    {t("When you're ready, click start!")}
                  </Text>
                </HStack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
}
