import { useAppDispatch } from "../store"
import { createRoom } from "../../hooks/room/slices/roomSlice"
export default function roomActions() {
  const dispatcher = useAppDispatch()
  const useCreateRoom = (name: string) => {
    dispatcher(createRoom(name))
  }

  return { useCreateRoom }
}
