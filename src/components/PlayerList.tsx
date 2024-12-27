import { Player } from "@/pages/game/types";
import { Table } from "@chakra-ui/react";
import { PlayerItem } from "./PlayerItem";
import { useTranslation } from "react-i18next";

interface PlayerListProps {
  players: Player[]
}

export function PlayerList({ players, ...rest }: PlayerListProps) {
    const { t } = useTranslation();

    return (
        <Table.Root variant='outline' {...rest}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>
                        {t('Name')}
                    </Table.ColumnHeader>

                    <Table.ColumnHeader>
                        {t('Bids')}
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {players.map(player => (
                    <Table.Row>
                        <Table.Cell>
                            <PlayerItem name={player.name} />
                        </Table.Cell>

                        <Table.Cell>
                            {player.tricks}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
