import Players from "../pages/components/Players";
import { store } from "../lib/store/store";
// import { addPlayer } from "../lib/hooks/room/slices/roomSlice"
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
const playersComponent = <Players />;

describe("testing of different components", () => {
    // #region playersComponent
    test("Players component", () => {
        render(
            <Provider store={store}>
                <>
                    <p>this is an example of the card component</p>
                    {playersComponent}
                </>
            </Provider>
        );
        const linkElement = screen.getByText(/this is an example of the card component/i);
        toBeInTheDocument(linkElement);
    });



});