import { ioEvents, player, playerType } from "../../lib/constants/declarations"
import FormDialog from "../templates/FormDialog"
import PlayerNameForm from "../templates/PlayerNameForm"
import { connection } from "../../lib/constants/constants"
import { store } from "../../lib/store/store"
import playerActions from "../../lib/hooks/player/playerActions"
export default function RoomInitialDialog() {
  const { useSetPlayer } = playerActions()


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
  }
  return (
    <FormDialog open handleSubmit={handleSubmit}>
      <PlayerNameForm />
    </FormDialog>
  )
}
