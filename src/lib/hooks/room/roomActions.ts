import { useAppDispatch } from "../store"
import { createRoom, addPlayer, vote } from "../../hooks/room/slices/roomSlice"
import { playerType } from "../../constants/declarations"
import { store } from "../../store/store"
export default function roomActions() {
  const dispatcher = useAppDispatch()
  const useCreateRoom = (name: string) => {
    dispatcher(createRoom(name))
  }
  const useAddPlayer = (name: string, type: keyof typeof playerType) => {
    let vote = "none"
    if (type === playerType.spectator) {
      vote = "spectator"
    }
    const player = { id: crypto.randomUUID(), name, type, vote }
    dispatcher(addPlayer(player))
    return player
  }

  const useVote = (card: string, id: string) => {
    dispatcher(vote({ card, id }))
  }

  const useRevealCards = () => {
    const players = store
      .getState()
      .room.players.filter((player) => player.type === playerType.player)
      .filter((player) => isNaN(Number(player.vote)) === false)
    let average = 0
    for (let i = 0; i < players.length; i++) {
      average += Number(players[i].vote)
    }
    return average === 0 ? average : average / players.length
  }
  return { useCreateRoom, useAddPlayer, useVote, useRevealCards }
}
