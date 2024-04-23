import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import Logo from "../../system-design/atoms/Logo";



test("testing the logo atom", () => {
    render(<Logo height="100" width="100" />);
    const logoElement = screen.getByRole("app-logo");
    toBeInTheDocument(logoElement);
}); 