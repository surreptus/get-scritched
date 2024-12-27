import { HStack, Text, Stack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Avatar } from "./ui/avatar";

interface PlayerItem {
  children?: ReactElement,
  name: string
}

const COLORS = ['red', 'green', 'teal', 'purple', 'orange', 'yellow', 'blue']

function getColor(name: string) {
  return COLORS[name.charCodeAt(0) % COLORS.length]
}

export function PlayerItem({ name, children }: PlayerItem) {
  return (
    <HStack key={name} gap="4">
      <Avatar colorPalette={getColor(name)} name={name} size="md" />

      <Stack
        flex="1"
        alignItems="center"
        justify="space-between"
        direction="row"
        gap="2"
      >
        <Text flex="1 auto" fontWeight="medium">
          {name}
        </Text>

        {children}
      </Stack>
    </HStack>
  )
}