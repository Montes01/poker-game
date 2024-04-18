import { render, screen } from "@testing-library/react";
import Button from "../../system-design/atoms/Button";

test("testing the button atom", () => {
    const buttonAction = jest.fn();
    render(<Button content="this is an example test button" onClick={buttonAction} />);
    const linkElement = screen.getByText(/this is an example test button/i);
    linkElement.click();
    expect(buttonAction).toHaveBeenCalledTimes(1);
});