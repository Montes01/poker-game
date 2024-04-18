import { render, screen } from "@testing-library/react";
import UserAvatar from "../../system-design/atoms/UserAvatar";



test("testing the user avatar atom", () => {
    const functionToCall = jest.fn();
    render(<UserAvatar name="user" action={functionToCall} />);
    const userAvatarElement = screen.getByText(/u/i);
    userAvatarElement.click();
    expect(functionToCall).toHaveBeenCalledTimes(1);
})