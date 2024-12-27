import { HStack, Text, Stack, Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Avatar } from "./ui/avatar";

interface PlayerItem {
  children?: ReactElement;
  name: string;
  caption: string;
}

const COLORS = ['red', 'green', 'teal', 'purple', 'orange', 'yellow', 'blue']

function getColor(name: string) {
  return COLORS[name.charCodeAt(0) % COLORS.length]
}

export function PlayerItem({ name, caption, children }: PlayerItem) {
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
        <Box flex="1 auto" fontWeight="medium">
          <Text fontWeight='medium'>
          {name}
          </Text>

          <Text fontSize='xs' color='gray.500'>
            {caption}
          </Text>
        </Box>

        {children}
      </Stack>
    </HStack>
  )
}