import { useEffect, useState } from "react"
import roomActions from "../../lib/hooks/room/roomActions"
import { store } from "../../lib/store/store"
import Button from "../../system-design/atoms/Button"
import Table from "../../system-design/atoms/Table"
export default function GameTable() {
  const { useReset } = roomActions()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      const playerId = state.player.id

      if (state.room.admin === playerId) setIsAdmin(true)

      if (state.room.players.every((player) => player.vote !== "none"))
        setIsComplete(true)
      else setIsComplete(false)

      if (state.room.isRevealed) setIsRevealed(true)
      else setIsRevealed(false)
    })
    return () => unsuscribe()
  }, [])
  const handleRevealClick = () => {
    // setCards(useVotePerCard())
  }
  const handleResetClick = () => {
    useReset()
  }
  return (
    <Table>
      {isAdmin && (
        <Button
          onClick={isRevealed ? handleResetClick : handleRevealClick}
          disabled={!isComplete}
          content={isRevealed ? "Nueva partida" : "Revelar cartas"}
        />
      )}
    </Table>
  )
}
