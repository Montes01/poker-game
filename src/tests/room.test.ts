import { configureStore } from "@reduxjs/toolkit";
import { type room, type player } from "../lib/constants/declarations";
import { slice, addPlayer, changeAdmin, updateRoom, changeCards, changePlayerType, reset, reveal, vote } from "../lib/hooks/room/slices/roomSlice";


describe("testing room store actions", () => {

    const store = configureStore({
        reducer: {
            room: slice
        }
    })
    const newRoom: room = {
        id: "NA",
        name: "test",
        admin: "test",
        players: [],
        isRevealed: false,
        cards: []
    }
    const newPlayer: player = {
        id: "1234",
        name: "test",
        type: "player",
        vote: "none"
    }
    test("room must be updated", () => {
        store.dispatch(updateRoom(newRoom))
        expect(store.getState().room).toEqual(newRoom)
    })
    test("player must be added", () => {
        store.dispatch(addPlayer(newPlayer))
        const found = store.getState().room.players.filter((player) => player.id === newPlayer.id)
        expect(found.length).toEqual(1)
        expect(found[0]).toEqual(newPlayer)
    })
    test("admin must be changed", () => {
        store.dispatch(changeAdmin("test"))
        expect(store.getState().room.admin).toBe("test")
    })
    test("cards must be changed", () => {
        const newCards = [{ content: "1", count: 0, voted: false }]
        store.dispatch(changeCards(newCards))
        expect(store.getState().room.cards).toEqual(newCards)
    })
    test("player type must be changed", () => {
        store.dispatch(changePlayerType({ playerId: "1234", type: "spectator" }))
        const found = store.getState().room.players.filter((player) => player.id === newPlayer.id)
        expect(found[0].type).toBe("spectator")
    })
    test("room must be reset", () => {
        store.dispatch(reset())
        expect(store.getState().room.isRevealed).toBe(false)
        expect(store.getState().room.players[0].vote).toBe("none")
        expect(store.getState().room.cards[0].count).toBe(0)
    })
    test("room must be revealed", () => {
        store.dispatch(reveal())
        expect(store.getState().room.isRevealed).toBe(true)
    })
    test("player must vote", () => {
        store.dispatch(vote({ playerId: "1234", cardContent: "1" }))
        const found = store.getState().room.players.filter((player) => player.id === newPlayer.id)
        expect(found[0].vote).toBe("1")
    })


}
)