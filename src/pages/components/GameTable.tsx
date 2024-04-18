import { useEffect, useRef, useState } from "react"
import { store } from "../../lib/store/store"
import Button from "../../system-design/atoms/Button"
import Table from "../../system-design/atoms/Table"
import FormDialog from "../../system-design/templates/FormDialog"
import RadioButton from "../../system-design/atoms/RadioButton"
import "../../assets/components/game-table.scss"
import { connection } from "../../lib/constants/constants"
import { ioEvents } from "../../lib/constants/declarations"
import ChangeCardsDialog from "./ChangeCardsDialog"
export default function GameTable() {
  const changeCardsRef = useRef<HTMLDialogElement>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [players, setPlayers] = useState(store.getState().room.players)
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setPlayers(state.room.players)
      const playerId = state.player.id
      setIsAdmin(state.room.admin === playerId)
      setIsComplete(
        state.room.players.every((player) => player.vote !== "none")
      )
      setIsRevealed(state.room.isRevealed)
    })
    return () => unsuscribe()
  }, [])
  const handleRevealClick = () => {
    connection.emit(ioEvents.reveal, store.getState().room.id)
  }
  const handleResetClick = () => {
    connection.emit(ioEvents.reset, store.getState().room.id)
  }
  const handleChangeAdminSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const adminId = data.get("admin") as string
    connection.emit(ioEvents.giveAdmin, {
      roomId: store.getState().room.id,
      admin: adminId,
    })
    changeAdminRef.current?.close()
  }
  const handleGiveAdminClick = () => {
    changeAdminRef.current?.showModal()
  }
  const changeAdminRef = useRef<HTMLDialogElement>(null)
  const handleChangeCardsClick = () => {
    changeCardsRef.current?.showModal()
  }

  return (
    <Table>
      
      {isAdmin && (
        <section className="table-content">
          {isRevealed ? (
            <Button onClick={handleResetClick} content="Nueva partida" />
          ) : (
            <Button onClick={handleRevealClick} disabled={!isComplete} content="Revelar cartas" />
          )}
          {!isRevealed && <Button content="Cambiar admin" onClick={handleGiveAdminClick} />}
          {!isRevealed && <Button content="Cambiar cartas" onClick={handleChangeCardsClick} />}
          <Button content="Cambiar admin" onClick={handleGiveAdminClick} />
        </section>
      )}
      <FormDialog
        dialogRef={changeAdminRef}
        handleSubmit={handleChangeAdminSubmit}
      >
        you can change into admin
        <section className="radio-buttons">
          {players.map((player) => {
            return (
              <RadioButton
                key={player.id}
                defaultChecked={player.id === store.getState().room.admin}
                label={player.name}
                name="admin"
                value={player.id}
              />
            )
          })}
        </section>
        <Button content="confirm" submit />
      </FormDialog>
      <ChangeCardsDialog changeCardsRef={changeCardsRef} />
    </Table>
  )
}
