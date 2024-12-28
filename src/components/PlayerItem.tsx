import { HStack, Text, Stack, Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Avatar } from "./ui/avatar";

interface PlayerItem {
  children?: ReactElement;
  name: string;
  caption: string;
}

const letters = 'abcdefghijklmnopqrstuvwxyz'

function getCss(name: string) {
  var str = name;
  var start = 0;
  let third = Math.floor(str.length / 3);
  let rgb: number[] = [];
  for (var i = 0; i < 3; i++) {
    let end = start + third
    if (i == 2) {
      end = str.length
    }
    let part = str.slice(start, end)
    let val = part.split('').reduce((acc, letter) => {
      return acc + letters.indexOf(letter.toLowerCase())
    }, 0)

    if (val % 2 == 0) {
      val = val * 10
    }
    if (val % 5 == 0) {
      val = val * 3
    }

    rgb = [...rgb, val]
    start += third
  }

  return {
    backgroundColor: `rgba(${rgb.join(',')})`,
    color: "rgba(0,0,0,0.8)"
  }
}

export function PlayerItem({ name, caption, children }: PlayerItem) {
  return (
    <HStack key={name} gap="4">
      <Avatar css={getCss(name)} name={name} size="md" />

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