import { ErrorMessage, Field, useFormikContext } from "formik";
import { Button, Input, InputAddon, Group, Stack } from "@chakra-ui/react";
import { FormValues, Player } from "./types";
import { Alert } from "@/components/ui/alert";
import { PlayerItem } from "@/components/PlayerItem";

interface BettingProps {
  players: Player[];
  onNext: () => void;
  maxBid: number;
}

export function Betting({ players, onNext, maxBid }: BettingProps) {
  const { isValid, values } = useFormikContext<FormValues>()
  let totalBid = values.plays.reduce((acc, curr) => (acc += curr.bid), 0)

  const description = totalBid > maxBid ? "expensive" : "cheap"
  function renderFields(players: Player[]) {

    return players.map((player, index) => {
      const fieldName = `plays[${index.toString()}].bid`;

      return (
        <PlayerItem key={player.name} name={player.name}>

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
      {totalBid} bid for so far, we are {Math.abs(maxBid - totalBid)} {description} 

      {renderFields(players)}

      <ErrorMessage name="players">
        {(message) => {
          console.log(message)
          if (typeof message != 'string') {
            return null
          }
          return (
            <Alert status="error" title="Someone needs to get scritched!">
              {message}
            </Alert>
          )
        }}
      </ErrorMessage>

      <Button disabled={!isValid} alignSelf='flex-start' colorPalette="green" onClick={onNext}>
        Confirm Bids
      </Button>
    </Stack>
  );
}
