import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import WarningIcon from "../../system-design/atoms/WarningIcon";


test("testing the warning icon atom", () => {
    render(<WarningIcon height="100" width="100" title="warning" />);
    const warningIconElement = screen.getByTitle(/warning/i);
    toBeInTheDocument(warningIconElement);
})
