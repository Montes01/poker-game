import { Provider } from "react-redux";
import { render, screen, } from "@testing-library/react";
import { useAppDispatch } from "../lib/hooks/store";
import { store } from "../lib/store/store";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import playerActions from "../lib/hooks/player/playerActions";
import roomActions from "../lib/hooks/room/roomActions";


test("testing the app store", () => {
    const spy = jest.fn();
    store.dispatch = spy;
    store.dispatch({ type: "test" })
    expect(spy).toHaveBeenCalled();
})


test("testing the app store", () => {
    render(
        <Provider store={store}>
            <ExampleComponent />
        </Provider>
    )
    const linkElement = screen.getByText(/testing the app store/i);
    toBeInTheDocument(linkElement);
    expect(true).toBe(true)
    // const button = screen.getByText("useSetPlayer")
    // button.click()
    // console.log(store.getState().player)

})



function ExampleComponent() {
    const dispatch = useAppDispatch();

    const { useSetPlayer, useRemoveVote, useSetIsSpectator, useSetVote } = playerActions()
    const { useCreateRoom, useAddPlayer, useVote, useChangeAdmin, useChangeCards, useRevealCards, useVotePerCard, useReset } = roomActions()

    console.log(dispatch)

    return (
        <div>testing the app store
            <button onClick={() => (useSetPlayer({ id: "1", name: "test", type: "player", vote: "none" }))}>useSetPlayer</button>
            <button onClick={() => (useSetVote("1"))}>useSetVote</button>
            <button onClick={() => (useRemoveVote())}>useRemoveVote</button>
            <button onClick={() => (useSetIsSpectator(true))}>useSetIsSpectator</button>
            <button onClick={() => (useCreateRoom("test"))}>useCreateRoom</button>
            <button onClick={() => (useAddPlayer({ id: "1", name: "test", type: "player", vote: "none" }))}>useAddPlayer</button>
            <button onClick={() => (useVote("1", "test"))}>useVote</button>
            <button onClick={() => (useChangeAdmin("test"))}>useChangeAdmin</button>
            <button onClick={() => (useChangeCards([{ content: "test", count: 1, voted: false }]))}>useChangeCards</button>
            <button onClick={() => (useRevealCards([{ content: "test", count: 1, voted: false }]))}>useRevealCards</button>
            <button onClick={() => (useVotePerCard())}>useVotePerCard</button>
            <button onClick={() => (useReset())}>useReset</button>
        </div>
    )
}