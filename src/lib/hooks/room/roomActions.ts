import { useAppDispatch } from "../store"
import { updateRoom, addPlayer, vote, changeAdmin, changeCards, reveal, reset, changePlayerType } from "../../hooks/room/slices/roomSlice"
import { Card, ioEvents, player, playerType, room } from "../../constants/declarations"
import { store } from "../../store/store"
import playerActions from "../player/playerActions"
import { connection } from "../../../lib/constants/constants"
import { cards } from "../../constants/constants"
import { v4 } from 'uuid'
export default function roomActions() {
  const dispatcher = useAppDispatch()
  const { useSetVote } = playerActions()
  const useCreateRoom = (name: string) => {
    const initialRoom: room = {
      id: "",
      name: "",
      admin: "",
      players: [],
      isRevealed: false,
      cards: cards,
    }

    const room = { ...initialRoom, id: v4(), name }
    connection.emit(ioEvents.createRoom, room)
  }
  const useAddPlayer = (player: player) => {
    dispatcher(addPlayer(player))
  }

  const useVote = (playerId: string, cardContent: string) => {
    dispatcher(vote({ playerId, cardContent }))
  }

  const useChangeAdmin = (admin: string) => {
    dispatcher(changeAdmin(admin))
  }
  const useChangeCards = (cards: Card[]) => {
    dispatcher(changeCards(cards))
    useSetVote("none")
  }
  const useRevealCards = (cards: Card[]) => {
    useChangeCards(cards)
    dispatcher(reveal())
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
  const useChangePlayerType = (playerId: string, type: keyof typeof playerType) => {
    dispatcher(changePlayerType({ playerId, type }))
  }
  const useGiveAdmin = (playerId: string) => {
    connection.emit(ioEvents.giveAdmin, {
      roomId: store.getState().room.id,
      admin: playerId,
    })
  }


  return {
    useUpdateRoom,
    useCreateRoom,
    useAddPlayer,
    useVote,
    useReset,
    useRevealCards,
    useVotePerCard,
    useGiveAdmin,
    useChangeAdmin,
    useChangeCards,
    useChangePlayerType,
  }
}
