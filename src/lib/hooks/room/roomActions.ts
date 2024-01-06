import { useAppDispatch } from "../store"
import { createRoom, addPlayer, vote, reset } from "../../hooks/room/slices/roomSlice"
import { Card, playerType } from "../../constants/declarations"
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

  const useVotePerCard = () => {
    const players = store
      .getState()
      .room.players.filter((player) => player.type === playerType.player)
    const cards: { content: string; count: number }[] = []
    for (let i = 0; i < players.length; i++) {
      if (cards.find((el) => el.content === players[i].vote)) {
        cards.find((card) => card.content === players[i].vote)!.count++
      } else {
        cards.push({ content: players[i].vote, count: 1 })
      }
    }
    return cards
  }
  const useReset = () => {
    dispatcher(reset())
  }
  return {
    useCreateRoom,
    useAddPlayer,
    useVote,
    useReset,
    useRevealCards,
    useVotePerCard,
  }
}
