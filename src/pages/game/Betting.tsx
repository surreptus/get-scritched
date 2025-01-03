import { Field, useFormikContext } from "formik";
import { Text, Button, Input, InputAddon, Group, Stack } from "@chakra-ui/react";
import { FormValues, Player, Round } from "./types";
import { Alert } from "@/components/ui/alert";
import { PlayerItem } from "@/components/PlayerItem";
import { useTranslation } from "react-i18next";
import { tallyScores } from "./helpers";

interface BettingProps {
  players: Player[];
  rounds: Round[];
  onNext: () => void;
  maxBid: number;
}

export function Betting({ players, onNext, rounds, maxBid }: BettingProps) {
  const { isValid, values, errors, dirty } = useFormikContext<FormValues>()
  const { t } = useTranslation();
  let totalBid = values.plays.reduce((acc, curr) => (acc += curr.bid), 0)
  const tally = tallyScores(rounds)

  const description = totalBid > maxBid ? t("expensive") : t("cheap")
  const error = typeof errors.plays === 'string'
    ? errors.plays as string
    : null

  function renderFields(players: Player[]) {
    return players.map((player, index) => {
      const fieldName = `plays[${index.toString()}].bid`;
      const points = tally[player.name]
        ? t('{{ count }} points', { count: tally[player.name] })
        : t('No Points')

      return (
        <PlayerItem key={player.name} caption={points} name={player.name}>
          <Field name={fieldName}>
            {({ field, form }: any) => (
              <Group>
                <InputAddon onClick={() => form.setFieldValue(field.name, field.value === 0 ? field.value : field.value - 1)}>-</InputAddon>
                <Input width='3rem' type='number' min={0} max={maxBid} {...field} />
                <InputAddon onClick={() => form.setFieldValue(field.name, field.value === maxBid ? field.value : field.value + 1)}>+</InputAddon>
              </Group>
            )}
          </Field>
        </PlayerItem>
      );
    });
  }

  return (
    <Stack spaceY="2" direction="column">
      <Text fontSize='sm'>
        {totalBid} {t("bid for so far, we are")} {Math.abs(maxBid - totalBid)} {description} 
      </Text>

      {renderFields(players)}

      {error && dirty && (
        <Alert status="error" title={t("Someone needs to get scritched!")}>
          {error}
        </Alert>
      )}

      <Button disabled={!isValid} alignSelf='flex-start' colorPalette="green" onClick={onNext}>
        {t("Confirm Bids")}
      </Button>
    </Stack>
  );
}
