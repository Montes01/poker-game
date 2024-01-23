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
  const { useSetPlayer, useSetVote, useSetIsSpectator } = playerActions()
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
    connection.emit(
      ioEvents.vote,
      {
        roomId: store.getState().room.id,
        vote: { card: card, id: store.getState().player.id },
      }
    )
    useSetVote(card)
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
    if (type === playerType.spectator)
      useVote("spectator")
    else useVote("none")
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
