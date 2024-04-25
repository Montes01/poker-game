import { ioEvents, player, playerType } from "../../lib/constants/declarations"
import FormDialog from "../templates/FormDialog"
import PlayerNameForm from "../templates/PlayerNameForm"
import { connection } from "../../lib/constants/constants"
import { store } from "../../lib/store/store"
import playerActions from "../../lib/hooks/player/playerActions"
import { useState } from "react"
export default function RoomInitialDialog() {
  const { UseSetPlayer } = playerActions()

  const [isOpen, setIsOpen] = useState(true)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userType = formData.get("user-type")! as keyof typeof playerType
    const username = formData.get("username")!.toString()
    connection.emit(
      ioEvents.addPlayer,
      { roomId: store.getState().room.id, name: username, type: userType },
      (player: player) => {
        UseSetPlayer(player)
      }
    )
  }
  const toggleOpen = (open: boolean) => setIsOpen(open)
  return (
    <FormDialog open={isOpen} toggleOpen={toggleOpen} handleSubmit={handleSubmit}>
      <PlayerNameForm />
    </FormDialog>
  )
}
