import { configureStore } from "@reduxjs/toolkit";
import { type player } from "../../lib/constants/declarations";
import { slice, setIsSpectator, setPlayer, setVote } from "../../lib/hooks/player/slices/playerSlice";
describe("testing player store actions", () => {
    let store = configureStore({
        reducer: {
            player: slice
        }
    })
    const playerTest: player = {
        id: "NA",
        name: "test",
        type: "player",
        vote: "none"
    }

    test("player must be set", () => {
        store.dispatch(setPlayer(playerTest))
        expect(store.getState().player).toEqual(playerTest)
    })

    test("player type must turn into spectator", () => {
        store.dispatch(setIsSpectator(true))
        expect(store.getState().player.type).toBe("spectator")
    })
    test("player type must turn into player", () => {
        store.dispatch(setIsSpectator(false))
        expect(store.getState().player.type).toBe("player")
    })
    test("player vote must be set", () => {
        store.dispatch(setVote("1"))
        expect(store.getState().player.vote).toBe("1")
    })
})