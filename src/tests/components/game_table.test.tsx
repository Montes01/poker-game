import { Provider } from "react-redux";
import { store } from "../../lib/store/store";
import GameTable from "../../pages/components/GameTable";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
function ComponentWithProvider() {
    return (
        <Provider store={store}>
            <GameTable />
        </Provider>
    );
}

it("GameTable component", () => {
    render(<ComponentWithProvider />);
    const linkElement = screen.getByRole("game-table");
    toBeInTheDocument(linkElement);
});