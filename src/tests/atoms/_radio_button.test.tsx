import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import RadioButton from "../../system-design/atoms/RadioButton";


test("testing the radio button atom", () => {
    render(<RadioButton name="radio" label="radio button" value="radio" />);
    const radioElement = screen.getByText(/radio button/i);
    toBeInTheDocument(radioElement);
})