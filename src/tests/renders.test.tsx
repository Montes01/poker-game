import { render, screen } from "@testing-library/react";
import Button from "../system-design/atoms/Button";

test("renders learn react link", () => {
  render(<Button content="Click me"/>);
  const linkElement = screen.getByText(/Click me/i);
  expect(linkElement).toBeInTheDocument();
});