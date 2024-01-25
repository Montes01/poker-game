import { useEffect, useRef } from "react"
import { ioEvents, player, playerType } from "../../lib/constants/declarations"
import FormDialog from "../templates/FormDialog"
import PlayerNameForm from "../templates/PlayerNameForm"
import { connection } from "../../App"
import { store } from "../../lib/store/store"
import playerActions from "../../lib/hooks/player/playerActions"
export default function RoomInitialDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { useSetPlayer } = playerActions()
  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userType = formData.get("user-type")! as keyof typeof playerType
    const username = formData.get("username")!.toString()
    connection.emit(
      ioEvents.addPlayer,
      { roomId: store.getState().room.id, name: username, type: userType },
      (player: player) => {
        useSetPlayer(player)
      }
    )

    dialogRef.current?.close()


  }
  return (
    <FormDialog dialogRef={dialogRef} handleSubmit={handleSubmit}>
      <PlayerNameForm />
    </FormDialog>
  )
}
