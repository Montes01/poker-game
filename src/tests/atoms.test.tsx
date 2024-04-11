import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../system-design/atoms/Button";
import Card from "../system-design/atoms/Card";
import Input from "../system-design/atoms/Input";
// import Logo from "../system-design/atoms/Logo";
// import RadioButton from "../system-design/atoms/RadioButton";
// import Table from "../system-design/atoms/Table";
// import UserAvatar from "../system-design/atoms/UserAvatar";
// import WarningIcon from "../system-design/atoms/WarningIcon";

test("testing the button atom", () => {
  const buttonAction = jest.fn();
  render(<Button content="this is an example test button" onClick={buttonAction} />);
  const linkElement = screen.getByText(/this is an example test button/i);
  linkElement.click();
  expect(buttonAction).toHaveBeenCalledTimes(1);
});

test("testing the card atom", () => {
  const functionToCall = jest.fn();
  render(<Card content="this is an example of the card component" onClick={functionToCall}  />);
  const linkElement = screen.getByText(/this is an example of the card component/i);
  linkElement.click();
  expect(functionToCall).toHaveBeenCalledTimes(1);
});

test("testing the input atom", () => {
  const changeFunction = jest.fn();
  render(<Input onChange={changeFunction} name="input" type="text" placeholder="hola como estamos" readonly />);
  const inputElement = screen.getByPlaceholderText(/hola como estamos/i);
  fireEvent.change(inputElement, { target: { value: "new value" } });
  expect(changeFunction).toHaveBeenCalledTimes(1);
  //must be required
  expect(inputElement).toHaveAttribute("required");
});

