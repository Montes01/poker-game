import { render, screen } from "@testing-library/react";
import Card from "../../system-design/atoms/Card";


test("testing the card atom", () => {
    const functionToCall = jest.fn();
    render(<Card content="this is an example of the card component" onClick={functionToCall} />);
    const linkElement = screen.getByText(/this is an example of the card component/i);
    linkElement.click();
    expect(functionToCall).toHaveBeenCalledTimes(1);
});