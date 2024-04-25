import { connection } from "../../lib/constants/constants"
import { ioEvents, playerType as playType } from "../../lib/constants/declarations"
import playerActions from "../../lib/hooks/player/playerActions"
import roomActions from "../../lib/hooks/room/roomActions"
import { store } from "../../lib/store/store"
import Button from "../../system-design/atoms/Button"
import FormDialog from "../../system-design/templates/FormDialog"
import { UseAppSelector } from "../../lib/hooks/store"

interface Props {
  open: boolean
  toggleOpenInvite: (open: boolean) => void
  toggleOpen: (open: boolean) => void
}
export default function ResponsiveButtonsDialog({ open, toggleOpen, toggleOpenInvite }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toggleOpen(false)
  }
  const { UseVote } = roomActions()
  const { UseSetIsSpectator, UseSetVote } = playerActions()

  const { type: playerType } = UseAppSelector((state) => state.player)


  const handleInviteClick = () => toggleOpenInvite(true)
  const handleChangeTypeClick = () => {
    const newType = playerType === playType.player ? playType.spectator : playType.player
    connection.emit(
      ioEvents.changeType,
      { roomId: store.getState().room.id, playerId: store.getState().player.id, type: newType },
      (data: { type: keyof typeof playType, playerId: string }) => {
        UseSetIsSpectator(data.type === "spectator")
        if (data.type === "spectator") {
          UseSetVote("spectator")
          UseVote(data.playerId, "spectator")
        } else {
          UseSetVote("none")
          UseVote(data.playerId, "none")
        }
      }
    )
  }

  return (
    <FormDialog open={open} canClose handleSubmit={handleSubmit}>
      <Button
        className="responsive-option"
        onClick={handleInviteClick}
        content="invitar jugadores"
      />
      <Button
        className="responsive-option"
        onClick={handleChangeTypeClick}
        content={`Cambiar a ${playerType === playType.player ? "espectador" : "jugador"}`}
      />
    </FormDialog>
  )
}
