import Players from "../pages/components/Players";
import { store } from "../lib/store/store";
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
                    <p>players working in</p>
                    {playersComponent}
                </>
            </Provider>
        );
        const linkElement = screen.getByText(/players working in/i);
        toBeInTheDocument(linkElement);
    });



});