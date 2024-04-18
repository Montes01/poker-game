import Players from "../pages/components/Players";
import { store } from "../lib/store/store";
// import { addPlayer } from "../lib/hooks/room/slices/roomSlice"
import Home from "../pages/Home.";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const playersComponent = <Players />;

describe("testing of different components", () => {
    // #region playersComponent
    test("Players component", () => {
        render(
            <Provider store={store}>
                <>
                    <p>players working in</p>
                    {playersComponent}
                </>
            </Provider>
        );
        const linkElement = screen.getByText(/players working in/i);
        toBeInTheDocument(linkElement);
    });


    // #region Home
    test("Home component", () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Routes >
                        <Route path="/" Component={Home}></Route>
                    </Routes>
                </Provider>
            </BrowserRouter>
        );
        const linkElement = screen.getByLabelText(/Nombra la partida/i);
        toBeInTheDocument(linkElement);
    })

});