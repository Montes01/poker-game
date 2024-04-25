import { useEffect, useState } from "react"

interface Props {
  dialogRef?: React.RefObject<HTMLDialogElement>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
  canClose?: boolean
  open?: boolean
}
export default function PlayerNameDialog({
  dialogRef,
  handleSubmit,
  children,
  canClose,
  open
}: Props) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const [dialogStyles, setDialogStyles] = useState({
    display: isOpen ? "flex" : "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000
  } as React.CSSProperties)

  const handleClose = () => {
    setIsOpen(false)
    setDialogStyles({ ...dialogStyles, display: "none" })
  }

  useEffect(() => {
    if (isOpen) {
      setDialogStyles({ ...dialogStyles, display: "flex" })
    } else {
      setDialogStyles({ ...dialogStyles, display: "none" })
    }
  }, [isOpen, dialogStyles])

  const onSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    handleClose()
  }
  return (
    <dialog open={isOpen} style={dialogStyles} role="dialog" ref={dialogRef} className="user-form-dialog">
      <form onSubmit={onSubmitted} className="user-form">
        {canClose && <button onClick={handleClose} role="close-dialog" className="close-dialog-button">x</button>}
        {children}
      </form>
    </dialog>
  )
}
