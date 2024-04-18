import { render, screen } from "@testing-library/react";
import Card from "../../system-design/atoms/Card";
import { toHaveClass } from "@testing-library/jest-dom/matchers";

describe("testing the card atom", () => {



    test("testing just the card atom", () => {
        const functionToCall = jest.fn();
        render(<Card content="this is an example of the card component" onClick={functionToCall} />);
        const card = screen.getByText(/this is an example of the card component/i);
        card.click();
        expect(functionToCall).toHaveBeenCalledTimes(1);
    });

    test("testing the card atom being in the table", () => {
        const functionToCall = jest.fn();
        render(<Card onTable content="this card is on table" onClick={functionToCall} />);
        const card = screen.getByText(/this card is on table/i);
        toHaveClass(card, "table-card");
    });

    test("testing the card that was voted", () => {
        const functionToCall = jest.fn();
        render(<Card vote="10" content="this card was voted" onClick={functionToCall} />);
        const card = screen.getByText(/this card was voted/i);
        toHaveClass(card, "voted");
    })






})