import { Provider } from "react-redux";
import { render, screen, } from "@testing-library/react";
import { store } from "../lib/store/store";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";


test("testing the app store", () => {
    const spy = jest.fn();
    store.dispatch = spy;
    store.dispatch({ type: "test" })
    expect(spy).toHaveBeenCalled();
})


test("testing the app store", () => {
    render(
        <Provider store={store}>
            <div>testing the app store</div>
        </Provider>
    )
    const linkElement = screen.getByText(/testing the app store/i);
    toBeInTheDocument(linkElement);


})
