import Footer from "../../system-design/organisms/Footer";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { Provider } from "react-redux";
import { store } from "../../lib/store/store";
test("testing the footer organism", () => {
    render(
        <RenderWithProvider>
            <Footer vote={() => null} />
        </RenderWithProvider>
    );
    const cards = screen.getAllByRole("game-card");
    toBeInTheDocument(cards[0]);
})




function RenderWithProvider({ children }: { children: React.ReactNode }) {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )


}