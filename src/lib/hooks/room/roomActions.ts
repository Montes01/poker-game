import { useAppDispatch } from "../store"
import { createRoom, addPlayer } from "../../hooks/room/slices/roomSlice"
import { playerType } from "../../constants/declarations"
export default function roomActions() {
  const dispatcher = useAppDispatch()
  const useCreateRoom = (name: string) => {
    dispatcher(createRoom(name))
  }
  const useAddPlayer = (name: string, type: keyof typeof playerType) => {
    const player = { id: crypto.randomUUID(), name, type, vote: 0 }
    dispatcher(addPlayer(player))
    return player.id
  }

  return { useCreateRoom, useAddPlayer }
}
