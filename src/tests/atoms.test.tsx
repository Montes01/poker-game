import { render, screen, fireEvent } from "@testing-library/react";
import { toBeRequired, toHaveAttribute, toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import Button from "../system-design/atoms/Button";
import Card from "../system-design/atoms/Card";
import Input from "../system-design/atoms/Input";
import Logo from "../system-design/atoms/Logo";
import RadioButton from "../system-design/atoms/RadioButton";
import Table from "../system-design/atoms/Table";
import UserAvatar from "../system-design/atoms/UserAvatar";
import WarningIcon from "../system-design/atoms/WarningIcon";

test("testing the button atom", () => {
  const buttonAction = jest.fn();
  render(<Button content="this is an example test button" onClick={buttonAction} />);
  const linkElement = screen.getByText(/this is an example test button/i);
  linkElement.click();
  expect(buttonAction).toHaveBeenCalledTimes(1);
});

test("testing the card atom", () => {
  const functionToCall = jest.fn();
  render(<Card content="this is an example of the card component" onClick={functionToCall} />);
  const linkElement = screen.getByText(/this is an example of the card component/i);
  linkElement.click();
  expect(functionToCall).toHaveBeenCalledTimes(1);
});

test("testing the input atom", () => {
  const changeFunction = jest.fn();
  render(<Input onChange={changeFunction} defaultValue="initial value" name="input" type="text" placeholder="hola como estamos" readonly />);
  const inputElement = screen.getByPlaceholderText(/hola como estamos/i) as HTMLInputElement;
  expect(inputElement.value).toBe("initial value");
  fireEvent.change(inputElement, { target: { value: "new value" } });
  expect(changeFunction).toHaveBeenCalledTimes(1);
  toBeRequired(inputElement);
  toHaveAttribute(inputElement, "readonly");
  expect(inputElement.value).toBe("new value");
});


test("testing the logo atom", () => {
  render(<Logo height="100" width="100" />);
  const logoElement = screen.getByRole("app-logo");
  toBeInTheDocument(logoElement);
});

test("testing the radio button atom", () => {
  render(<RadioButton name="radio" label="radio button" value="radio" />);
  const radioElement = screen.getByText(/radio button/i);
  toBeInTheDocument(radioElement);
})

test("testing the table atom", () => {
  render(<Table />);
  const tableElement = screen.getByRole("game-table");
  toBeInTheDocument(tableElement);
})


test("testing the user avatar atom", () => {
  const functionToCall = jest.fn();
  render(<UserAvatar name="user" action={functionToCall} />);
  const userAvatarElement = screen.getByText(/u/i);
  userAvatarElement.click();
  expect(functionToCall).toHaveBeenCalledTimes(1);
})

test("testing the warning icon atom", () => {
  render(<WarningIcon height="100" width="100" title="warning" />);
  const warningIconElement = screen.getByTitle(/warning/i);
  toBeInTheDocument(warningIconElement);
})