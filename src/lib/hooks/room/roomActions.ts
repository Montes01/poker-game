import { useAppDispatch } from "../store"
import {
  createRoom,
  addPlayer,
  vote,
  updateRoom,
  reset,
} from "../../hooks/room/slices/roomSlice"
import { Card, playerType, room } from "../../constants/declarations"
import { store } from "../../store/store"
import playerActions from "../player/playerActions"

export default function roomActions() {
  const dispatcher = useAppDispatch()
  const { useSetPlayer } = playerActions()
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
    useSetPlayer(player)
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

  const useVotePerCard = (): Card[] => {
    const players = store
      .getState()
      .room.players.filter((player) => player.type === playerType.player)
    const cards: Card[] = []
    for (let i = 0; i < players.length; i++) {
      if (cards.find((card) => card.content === players[i].vote)) {
        cards.find((card) => card.content === players[i].vote)!.count!++
      } else {
        cards.push({ content: players[i].vote, count: 1, voted: false })
      }
    }
    return cards
  }
  const useReset = () => {
    dispatcher(reset())
  }
  const useUpdateRoom = (room: room) => {
    dispatcher(updateRoom(room))
  }
  return {
    useUpdateRoom,
    useCreateRoom,
    useAddPlayer,
    useVote,
    useReset,
    useRevealCards,
    useVotePerCard,
  }
}
