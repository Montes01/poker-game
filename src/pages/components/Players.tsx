import { useMemo } from "react"
import Card from "../../system-design/atoms/Card"
import UserAvatar from "../../system-design/atoms/UserAvatar"
import { ioEvents } from "../../lib/constants/declarations"
import { connection } from "../../lib/constants/constants"
import roomActions from "../../lib/hooks/room/roomActions"
import { UseAppSelector } from "../../lib/hooks/store"

export default function Players() {
  const { UseAddPlayer } = roomActions()
  useMemo(() => {
    connection.on(ioEvents.addPlayer, (player) => UseAddPlayer(player))
  }, [])
  const players = UseAppSelector((state) => state.room.players)

  return players.map((player, index) => player.type === "spectator" ? (
    <UserAvatar
      key={player.id}
      onTable
      name={player.name}
      className={`user${index}`}
    />
  ) : (
    <Card
      vote={player.vote}
      onTable
      content={player.name}
      key={player.id}
      className={`user${index}`}
    />
  )
  )
}
