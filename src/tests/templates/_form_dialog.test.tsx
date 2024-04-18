import { render, screen, fireEvent } from "@testing-library/react";
import PlayerNameDialog from "../../system-design/templates/FormDialog";
import { useRef } from "react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

describe("testing the player name dialog template", () => {
    const FunctionToCall = jest.fn();
    beforeEach(() => {
        render(<Component submit={FunctionToCall} />);
    });

    test("testing the player name dialog template", () => {
        const dialog = screen.getByRole("dialog");
        toBeInTheDocument(dialog);
    })

    test("testing the player name dialog submit", () => {
        const submitButton = screen.getByRole("button", { name: /enviar/i });
        fireEvent.click(submitButton);
        expect(FunctionToCall).toHaveBeenCalledTimes(1);
    })

    // test("testing the player name dialog close", () => {//role="close-dialog"
    //     const closeButton = screen.getByRole("close-dialog");
    //     fireEvent.click(closeButton);
    //     const dialog = screen.getByRole("dialog");
    //     toHaveAttribute(dialog, "open", false);
    // })




})

function Component({ submit }: { submit: Function }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit();
    }

    return (
        <PlayerNameDialog open dialogRef={dialogRef} canClose handleSubmit={handleSubmit} >
            dialog
            <button type="submit">enviar</button>
        </PlayerNameDialog>
    )


}