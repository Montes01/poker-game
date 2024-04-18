import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import Table from "../../system-design/atoms/Table";

test("testing the table atom", () => {
    render(<Table />);
    const tableElement = screen.getByRole("game-table");
    toBeInTheDocument(tableElement);
})