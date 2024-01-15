import { useAppDispatch } from "../store"
import {
  createRoom,
  updateRoom,
} from "../../hooks/room/slices/roomSlice"
import { Card, ioEvents, playerType, room } from "../../constants/declarations"
import { store } from "../../store/store"
import playerActions from "../player/playerActions"
import { connection } from "../../../App"

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
    useSetPlayer(player)
    connection.emit(ioEvents.addPlayer, {
      roomId: store.getState().room.id,
      player: player,
    })
  }

  const useVote = (card: string) => {
    connection.emit(ioEvents.vote, {
      roomId: store.getState().room.id,
      vote: { card: card, id: store.getState().player.id },
    })
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
    connection.emit(ioEvents.reset, store.getState().room.id)
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
