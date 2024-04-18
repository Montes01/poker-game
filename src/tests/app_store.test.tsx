import { Provider } from "react-redux";
import { render, screen, } from "@testing-library/react";
import { store } from "../lib/store/store";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
// import playerActions from "../lib/hooks/player/playerActions";
// import roomActions from "../lib/hooks/room/roomActions";


test("testing the app store", () => {
    const spy = jest.fn();
    store.dispatch = spy;
    store.dispatch({ type: "test" })
    expect(spy).toHaveBeenCalled();
})


test("testing the app store", () => {
    render(
        <Provider store={store}>
            <div>testing the app store</div>
        </Provider>
    )
    const linkElement = screen.getByText(/testing the app store/i);
    toBeInTheDocument(linkElement);
    // const roomActionsSpy = jest.spyOn(roomActions, "useUpdateRoom");
    // roomActionsSpy.mockImplementation(() => {});

    // console.log(roomActionsSpy)

})

/*
import { useAppDispatch } from "../store"
import { updateRoom, addPlayer, vote, changeAdmin, changeCards, reveal, reset, changePlayerType } from "../../hooks/room/slices/roomSlice"
import { Card, ioEvents, player, playerType, room } from "../../constants/declarations"
import { store } from "../../store/store"
import playerActions from "../player/playerActions"
import { connection } from "../../../App"
import { cards } from "../../constants/constants"

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

    const room = { ...initialRoom, id: crypto.randomUUID(), name }
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

*/