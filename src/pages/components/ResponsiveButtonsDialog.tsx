
import {  useState, useEffect } from "react"
import { connection } from "../../App"
import { ioEvents, playerType as playType } from "../../lib/constants/declarations"
import playerActions from "../../lib/hooks/player/playerActions"
import roomActions from "../../lib/hooks/room/roomActions"
import {store} from "../../lib/store/store"
import Button from "../../system-design/atoms/Button"
import FormDialog from "../../system-design/templates/FormDialog"

interface Props {
    Ref: React.RefObject<HTMLDialogElement>
    inviteRef: React.RefObject<HTMLDialogElement>
}
export default function ResponsiveButtonsDialog({ Ref, inviteRef}: Props) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        Ref.current?.close()
    }


    const {useVote } = roomActions()
    const { useSetIsSpectator, useSetVote } = playerActions()

    const [playerType, setPlayerType] = useState(store.getState().player.type)

    useEffect(() => {
      const unsuscribe = store.subscribe(() => {
        const state = store.getState()
        setPlayerType(state.player.type)
      })
      return () => unsuscribe()
    }, [])
  
    const handleInviteClick = () => inviteRef.current?.showModal()
    const handleChangeTypeClick = () => {
      const newType = playerType === playType.player ? playType.spectator : playType.player
      connection.emit(
        ioEvents.changeType,
        { roomId: store.getState().room.id, playerId: store.getState().player.id, type: newType },
        (data: { type: keyof typeof playType, playerId: string }) => {
          useSetIsSpectator(data.type === "spectator")
          if (data.type === "spectator") {
            useSetVote("spectator")
            useVote(data.playerId, "spectator")
          } else {
            useSetVote("none")
            useVote(data.playerId, "none")
          }
        }
      )
    }

    return (
        <FormDialog canClose dialogRef={Ref} handleSubmit={handleSubmit}>
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
