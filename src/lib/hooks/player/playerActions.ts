import { player } from "../../constants/declarations"
import { useAppDispatch } from "../store"
import { setPlayer, setIsSpectator, setVote } from "./slices/playerSlice"
export default function playerActions() {
  const dispatcher = useAppDispatch()
  const useSetPlayer = (player: player) => {
    dispatcher(setPlayer(player))
  }
  const useSetIsSpectator = (isSpectator: boolean) => {
    dispatcher(setIsSpectator(isSpectator))
  }
  const useSetVote = (vote: string) => {
    dispatcher(setVote(vote))
  }
  return {
    useSetPlayer,
    useSetVote,
    useSetIsSpectator,
  }
}
