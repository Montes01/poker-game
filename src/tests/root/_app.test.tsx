import App from "../../App";
import { render } from "@testing-library/react";
import { store } from "../../lib/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
describe("testing of app component", () => {
    test("App component", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
    });
});