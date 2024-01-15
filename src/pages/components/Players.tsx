import { useState, useEffect } from "react"
import { store } from "../../lib/store/store"
import Card from "../../system-design/atoms/Card"
import UserAvatar from "../../system-design/atoms/UserAvatar"

export default function Players() {
  const [players, setPlayers] = useState(store.getState().room.players)
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setPlayers(state.room.players)
    })
    return () => unsuscribe()
  }, [])
  return players.map((player, index) => (
    <>
      {player.type === "spectator" ? (
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
      )}
    </>
  ))
}
