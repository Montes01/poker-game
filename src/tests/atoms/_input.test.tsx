import { render, screen, fireEvent } from "@testing-library/react";
import { toBeRequired, toHaveAttribute } from "@testing-library/jest-dom/matchers";
import Input from "../../system-design/atoms/Input";



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
