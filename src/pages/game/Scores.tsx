import { Text, Table, HStack, Icon, Separator, Button, Stack } from "@chakra-ui/react"
import { Round } from "./types"
import { useTranslation } from "react-i18next";
import { SUIT_ICON } from "./constants";
import { Link } from "react-router";

interface ScoresProps {
    rounds: Round[]
}

export function Scores({ rounds }: ScoresProps) {
  const { t } = useTranslation();
  var scores:Record<string, number> = rounds.reduce((acc, curr) => {
    return curr.plays.reduce((totals:Record<string, number>, play) => {
      if (play.scritched) {
        return totals
      }
      if (totals[play.name]) {
        totals[play.name] += play.bid + 10
      } else {
        totals[play.name] = play.bid + 10
      }
      return totals
    }, acc)
  }, {})

  let winner = undefined;

  for (const player in scores) {
    if (!winner) {
      winner = player
    }

    if (scores[winner] < scores[player]) {
      winner = player
    }
  }

  return (
    <Stack gap='4'>
      <Text>
        {t('Game over, Congratulations {{ player }}!', { player: winner })}
      </Text>

      <Table.Root variant='outline'>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              {t("Round")}
            </Table.Cell>

            {rounds[0].plays.map(play =>
              <Table.Cell>
                {play.name}
              </Table.Cell>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rounds.map((round, index) => {
            const IconComponent = SUIT_ICON[round.suit]
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <HStack>
                    <Text fontSize='xs'>
                      {round.cards}
                    </Text>

                    <Separator orientation="vertical" height="4" />

                    <Icon size="lg">
                      <IconComponent />
                    </Icon>
                  </HStack>
                </Table.Cell>

                {round.plays.map(play => (
                  <Table.Cell>
                    {play.scritched ? (
                      <Text textDecoration='line-through'>{play.bid + 10}</Text>
                    ) : (
                      <Text>{play.bid + 10}</Text>
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            )
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell>
              {t("Total:")}
            </Table.Cell>
            {rounds[0].plays.map(play => (
              <Table.Cell>
                {scores[play.name]}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Footer>
      </Table.Root>

      <Link to='/setup'>
        <Button colorScheme='green'>
          {t('Start Again')}
        </Button>
      </Link>
    </Stack>
  )
}
