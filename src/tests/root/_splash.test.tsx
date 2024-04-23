import Splash from "../../pages/Splash";
import { render } from "@testing-library/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
describe("testing of splash component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Splash />} />
                </Routes>
            </BrowserRouter>
        );
    });

    test(" 2500 ms delay must be called the useNavigate function", () => {
        // const spy = jest.spyOn(window, "setTimeout");
        // expect(spy).toHaveBeenCalled();
    })



})