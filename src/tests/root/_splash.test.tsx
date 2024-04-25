import Splash from "../../pages/Splash";
import { render } from "@testing-library/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
describe("testing of splash component", () => {


    test(" 2500 ms delay must be called the useNavigate function", () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Splash />} />
                </Routes>
            </BrowserRouter>
        );
    })



})