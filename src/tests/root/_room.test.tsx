import Room from "../../pages/Room";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { Provider } from "react-redux";
import { store } from "../../lib/store/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";

describe("testing of room component", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Room />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        );
    });
    test("Room component", () => {
        const linkElement = screen.getByRole("room");
        toBeInTheDocument(linkElement);
    });
});