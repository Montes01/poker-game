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


    it("testing UseCreateRoom hook", () => {
        expect(result?.UseCreateRoom).toBeTruthy();
        const spy = jest.spyOn(result!, "UseCreateRoom");
        result?.UseCreateRoom("test");
        expect(spy).toHaveBeenCalledWith("test");
    });

    it("testing UseAddPlayer hook", () => {
        expect(result?.UseAddPlayer).toBeTruthy();
        const spy = jest.spyOn(result!, "UseAddPlayer");
        const player = { id: "test", name: "test", type: "player", vote: "none" } as player;
        result?.UseAddPlayer(player);
        expect(spy).toHaveBeenCalledWith(player);
    });

    it("testing UseVote hook", () => {
        expect(result?.UseVote).toBeTruthy();
        const spy = jest.spyOn(result!, "UseVote");
        result?.UseVote("test", "test");
        expect(spy).toHaveBeenCalledWith("test", "test");
    });

    it("testing UseChangeAdmin hook", () => {
        expect(result?.UseChangeAdmin).toBeTruthy();
        const spy = jest.spyOn(result!, "UseChangeAdmin");
        result?.UseChangeAdmin("test");
        expect(spy).toHaveBeenCalledWith("test");
    });

    it("testing UseChangeCards hook", () => {
        expect(result?.UseChangeCards).toBeTruthy();
        const spy = jest.spyOn(result!, "UseChangeCards");
        const cards = [{ content: "1", count: 0, voted: false }];
        result?.UseChangeCards(cards);
        expect(spy).toHaveBeenCalledWith(cards);
    });

    it("testing UseRevealCards hook", () => {
        expect(result?.UseRevealCards).toBeTruthy();
        const spy = jest.spyOn(result!, "UseRevealCards");
        const cards = [{ content: "1", count: 0, voted: false }];
        result?.UseRevealCards(cards);
        expect(spy).toHaveBeenCalledWith(cards);
    });

    it("testing UseVotePerCard hook", () => {
        expect(result?.UseVotePerCard).toBeTruthy();
        const spy = jest.spyOn(result!, "UseVotePerCard");
        result?.UseVotePerCard();
        expect(spy).toHaveBeenCalled();
    });

    it("testing UseReset hook", () => {
        expect(result?.UseReset).toBeTruthy();
        const spy = jest.spyOn(result!, "UseReset");
        result?.UseReset();
        expect(spy).toHaveBeenCalled();
    });

    it("testing UseUpdateRoom hook", () => {
        expect(result?.UseUpdateRoom).toBeTruthy();
        const spy = jest.spyOn(result!, "UseUpdateRoom");
        const room = { id: "NA", name: "test", admin: "test", players: [], isRevealed: false, cards: [] };
        result?.UseUpdateRoom(room);
        expect(spy).toHaveBeenCalledWith(room);
    });

    it("testing UseChangePlayerType hook", () => {
        expect(result?.UseChangePlayerType).toBeTruthy();
        const spy = jest.spyOn(result!, "UseChangePlayerType");
        result?.UseChangePlayerType("test", "player");
        expect(spy).toHaveBeenCalledWith("test", "player");
    });

    it("testing UseGiveAdmin hook", () => {
        expect(result?.UseGiveAdmin).toBeTruthy();
        const spy = jest.spyOn(result!, "UseGiveAdmin");
        result?.UseGiveAdmin("test");
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