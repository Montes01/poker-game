import { useAppDispatch } from "../store"
import { createRoom, addPlayer, vote } from "../../hooks/room/slices/roomSlice"
import { playerType } from "../../constants/declarations"
export default function roomActions() {
  const dispatcher = useAppDispatch()
  const useCreateRoom = (name: string) => {
    dispatcher(createRoom(name))
  }
  const useAddPlayer = (name: string, type: keyof typeof playerType) => {
    const player = { id: crypto.randomUUID(), name, type, vote: "none" }
    dispatcher(addPlayer(player))
    return player
  }

  const useVote = (card: string, id: string) => {
    dispatcher(vote({ card, id }))
  }

  return { useCreateRoom, useAddPlayer, useVote }
}
