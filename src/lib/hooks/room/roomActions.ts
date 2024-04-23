import { UseAppDispatch } from "../store"
import { updateRoom, addPlayer, vote, changeAdmin, changeCards, reveal, reset, changePlayerType } from "../../hooks/room/slices/roomSlice"
import { Card, ioEvents, player, playerType, room } from "../../constants/declarations"
import { store } from "../../store/store"
import playerActions from "../player/playerActions"
import { connection } from "../../../lib/constants/constants"
import { cards } from "../../constants/constants"
import { v4 } from 'uuid'
export default function roomActions() {
  const dispatcher = UseAppDispatch()
  const { UseSetVote } = playerActions()
  const UseCreateRoom = (name: string) => {
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
  const UseAddPlayer = (player: player) => {
    dispatcher(addPlayer(player))
  }

  const UseVote = (playerId: string, cardContent: string) => {
    dispatcher(vote({ playerId, cardContent }))
  }

  const UseChangeAdmin = (admin: string) => {
    dispatcher(changeAdmin(admin))
  }
  const UseChangeCards = (cards: Card[]) => {
    dispatcher(changeCards(cards))
    UseSetVote("none")
  }
  const UseRevealCards = (cards: Card[]) => {
    UseChangeCards(cards)
    dispatcher(reveal())
  }

  const UseVotePerCard = (): Card[] => {
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
  const UseReset = () => {
    dispatcher(reset())
  }
  const UseUpdateRoom = (room: room) => {
    dispatcher(updateRoom(room))
  }
  const UseChangePlayerType = (playerId: string, type: keyof typeof playerType) => {
    dispatcher(changePlayerType({ playerId, type }))
  }
  const UseGiveAdmin = (playerId: string) => {
    connection.emit(ioEvents.giveAdmin, {
      roomId: store.getState().room.id,
      admin: playerId,
    })
  }


  return {
    UseUpdateRoom,
    UseCreateRoom,
    UseAddPlayer,
    UseVote,
    UseReset,
    UseRevealCards,
    UseVotePerCard,
    UseGiveAdmin,
    UseChangeAdmin,
    UseChangeCards,
    UseChangePlayerType,
  }
}
