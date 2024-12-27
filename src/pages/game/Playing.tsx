import { Button, HStack, Table, Text } from "@chakra-ui/react";
import { FormValues, Player } from "./types";
import { PlayerItem } from "@/components/PlayerItem";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface PlayingProps {
  players: Player[],
  onBack: () => void
}

export function Playing({ onBack, players }: PlayingProps) {
  const { values, isValid, validateForm } = useFormikContext<FormValues>()
  const { t } = useTranslation();

  useEffect(() => {
    validateForm()
  }, [])

  return (
    <div>
      <Table.Root mb='4' variant='outline'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>
              {t("Name")}
            </Table.ColumnHeader>

            <Table.ColumnHeader>
              {t("Bids")}
            </Table.ColumnHeader>

            <Table.ColumnHeader>
              {t("Scritched?")}
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {players.map((player, index) => (
            <Table.Row key={player.name}>
              <Table.Cell>
                <PlayerItem name={player.name} />
              </Table.Cell>

              <Table.Cell>
                <Field name={`plays[${index.toString()}].bid`}>
                  {({ field }: any) => <Text>{field.value}</Text>}
                </Field>
              </Table.Cell>

              <Table.Cell>
                <Field name={`plays[${index.toString()}].scritched`}>
                  {({ field, form }: any) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={({ checked }) => form.setFieldValue(`plays[${index}].scritched`, checked)}
                      variant='subtle'
                    />
                  )}
                </Field>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <HStack>
        <Button variant='ghost' onClick={onBack}>
          {t("Back")}
        </Button>

        <Button disabled={!isValid} type='submit' colorPalette='green'>{t("Continue")}</Button>

        <Field name='descending'>
          {({ field, form }: any) => (
            <Checkbox disabled={values.descending} checked={field.value} onCheckedChange={({ checked }) => form.setFieldValue(`descending`, checked)} variant='subtle'>
              {t("Descending?")}
            </Checkbox>
          )}
        </Field>
      </HStack>
    </div>
  );
}
