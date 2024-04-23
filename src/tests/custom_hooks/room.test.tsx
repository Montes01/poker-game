// import { Component } from "react";
import roomActions from "../../lib/hooks/room/roomActions";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../lib/store/store";
import { player } from "../../lib/constants/declarations";


let result: ReturnType<typeof roomActions> | undefined;

describe("Room Test", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>+
                <Component />
            </Provider>
        );
    });
    it("result", () => {
        expect(result).toBeTruthy();
    });


    it("testing useCreateRoom hook", () => {
        expect(result?.useCreateRoom).toBeTruthy();
        const spy = jest.spyOn(result!, "useCreateRoom");
        result?.useCreateRoom("test");
        expect(spy).toHaveBeenCalledWith("test");
    });

    it("testing useAddPlayer hook", () => {
        expect(result?.useAddPlayer).toBeTruthy();
        const spy = jest.spyOn(result!, "useAddPlayer");
        const player = { id: "test", name: "test", type: "player", vote: "none" } as player;
        result?.useAddPlayer(player);
        expect(spy).toHaveBeenCalledWith(player);
    });

    it("testing useVote hook", () => {
        expect(result?.useVote).toBeTruthy();
        const spy = jest.spyOn(result!, "useVote");
        result?.useVote("test", "test");
        expect(spy).toHaveBeenCalledWith("test", "test");
    });

    it("testing useChangeAdmin hook", () => {
        expect(result?.useChangeAdmin).toBeTruthy();
        const spy = jest.spyOn(result!, "useChangeAdmin");
        result?.useChangeAdmin("test");
        expect(spy).toHaveBeenCalledWith("test");
    });

    it("testing useChangeCards hook", () => {
        expect(result?.useChangeCards).toBeTruthy();
        const spy = jest.spyOn(result!, "useChangeCards");
        const cards = [{ content: "1", count: 0, voted: false }];
        result?.useChangeCards(cards);
        expect(spy).toHaveBeenCalledWith(cards);
    });

    it("testing useRevealCards hook", () => {
        expect(result?.useRevealCards).toBeTruthy();
        const spy = jest.spyOn(result!, "useRevealCards");
        const cards = [{ content: "1", count: 0, voted: false }];
        result?.useRevealCards(cards);
        expect(spy).toHaveBeenCalledWith(cards);
    });

    it("testing useVotePerCard hook", () => {
        expect(result?.useVotePerCard).toBeTruthy();
        const spy = jest.spyOn(result!, "useVotePerCard");
        result?.useVotePerCard();
        expect(spy).toHaveBeenCalled();
    });

    it("testing useReset hook", () => {
        expect(result?.useReset).toBeTruthy();
        const spy = jest.spyOn(result!, "useReset");
        result?.useReset();
        expect(spy).toHaveBeenCalled();
    });

    it("testing useUpdateRoom hook", () => {
        expect(result?.useUpdateRoom).toBeTruthy();
        const spy = jest.spyOn(result!, "useUpdateRoom");
        const room = { id: "NA", name: "test", admin: "test", players: [], isRevealed: false, cards: [] };
        result?.useUpdateRoom(room);
        expect(spy).toHaveBeenCalledWith(room);
    });

    it("testing useChangePlayerType hook", () => {
        expect(result?.useChangePlayerType).toBeTruthy();
        const spy = jest.spyOn(result!, "useChangePlayerType");
        result?.useChangePlayerType("test", "player");
        expect(spy).toHaveBeenCalledWith("test", "player");
    });

    it("testing useGiveAdmin hook", () => {
        expect(result?.useGiveAdmin).toBeTruthy();
        const spy = jest.spyOn(result!, "useGiveAdmin");
        result?.useGiveAdmin("test");
        expect(spy).toHaveBeenCalledWith("test");
    })

    


});



function Component() {
    result = roomActions();
    return (
        <div>
            Room Test
        </div>
    );
}