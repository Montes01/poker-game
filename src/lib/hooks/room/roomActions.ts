import { useAppDispatch } from "../store"
import { updateRoom, addPlayer, vote } from "../../hooks/room/slices/roomSlice"
import { Card, ioEvents, player, playerType, room } from "../../constants/declarations"
import { store } from "../../store/store"
import playerActions from "../player/playerActions"
import { connection } from "../../../App"
import { cards } from "../../constants/constants"

export default function roomActions() {
  const dispatcher = useAppDispatch()
  const { useSetVote, useSetIsSpectator } = playerActions()
  const useCreateRoom = (name: string) => {
    const initialRoom: room = {
      id: "",
      name: "",
      admin: "",
      players: [],
      isRevealed: false,
      cards: cards,
    }

    const room = { ...initialRoom, id: crypto.randomUUID(), name }
    connection.emit(ioEvents.createRoom, room)
  }
  const useAddPlayer = (player: player) => {
    dispatcher(addPlayer(player))
  }

  const useVote = (playerId: string, cardContent: string) => {
    dispatcher(vote({ playerId, cardContent }))
  }

  const useRevealCards = () => {
    connection.emit(ioEvents.reveal, store.getState().room.id)
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
  const useGiveAdmin = (playerId: string) => {
    connection.emit(ioEvents.giveAdmin, {
      roomId: store.getState().room.id,
      admin: playerId,
    })
  }
  const useChangeType = (playerId: string, type: keyof typeof playerType) => {
    connection.emit(ioEvents.changeType, {
      roomId: store.getState().room.id,
      playerId: playerId,
      type,
    })
    useSetIsSpectator(type === playerType.spectator)
    // if (type === playerType.spectator)
    //   useVote("spectator")
    // else useVote("none")
  }

  return {
    useChangeType,
    useUpdateRoom,
    useCreateRoom,
    useAddPlayer,
    useVote,
    useReset,
    useRevealCards,
    useVotePerCard,
    useGiveAdmin,
  }
}
