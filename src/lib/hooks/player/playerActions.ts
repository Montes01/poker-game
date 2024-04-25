import { player } from "../../constants/declarations"
import { UseAppDispatch } from "../store"
import { setPlayer, setIsSpectator, setVote } from "./slices/playerSlice"
export default function playerActions() {
  const dispatcher = UseAppDispatch()
  const UseSetPlayer = (player: player) => {
    dispatcher(setPlayer(player))
  }
  const UseSetIsSpectator = (isSpectator: boolean) => {
    dispatcher(setIsSpectator(isSpectator))
  }
  const UseSetVote = (vote: string) => {
    dispatcher(setVote(vote))
  }
  const UseRemoveVote = () => {
    dispatcher(setVote("none"))
  }
  return {
    UseSetPlayer,
    UseSetVote,
    UseSetIsSpectator,
    UseRemoveVote
  }
}
