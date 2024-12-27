import { Text, Table } from "@chakra-ui/react"
import { Round } from "./types"
import { useTranslation } from "react-i18next";

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

  return (
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
        {rounds.map((round, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              {round.cards} | {t(round.suit)}
            </Table.Cell>

            {round.plays.map(play => (
              <Table.Cell>
                { play.scritched ? (
                  <Text textDecoration='line-through'>{play.bid}</Text>
                ) : (
                  <Text>{play.bid + 10}</Text>
                )}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
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
  )
}
