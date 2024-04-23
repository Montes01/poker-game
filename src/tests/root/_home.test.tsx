import { store } from "../../lib/store/store";
import Home from "../../pages/Home.";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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