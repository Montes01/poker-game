import playerActions from "../../lib/hooks/player/playerActions";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../lib/store/store";
import { player } from "../../lib/constants/declarations";

let result: ReturnType<typeof playerActions> | undefined;
function Component() {
    result = playerActions();
    return (
        <div></div>
    );
}

describe("Player Test", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Component />
            </Provider>
        );
    });
    it("result", () => {
        expect(result).toBeTruthy();
    });

    it("testing useCreatePlayer hook", () => {
        expect(result).toBeTruthy();
        const { useSetPlayer } = result!;
        expect(useSetPlayer).toBeTruthy();
        let player = { id: "test", name: "test", type: "player", vote: "none" } as player;
        useSetPlayer(player);
        expect(store.getState().player).toEqual(player);
    });

    it("testing useSetVote hook", () => {
        expect(result).toBeTruthy();
        const { useSetVote } = result!;
        expect(useSetVote).toBeTruthy();
        useSetVote("test");
        expect(store.getState().player.vote).toEqual("test");
    });

    it("testing useReset hook", () => {
        expect(result).toBeTruthy();
        const { useRemoveVote } = result!;
        expect(useRemoveVote).toBeTruthy();
        useRemoveVote();
        expect(store.getState().player.vote).toEqual("none");
    });

})