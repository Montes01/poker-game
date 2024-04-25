import { useEffect, useState } from "react"

interface Props {
  dialogRef?: React.RefObject<HTMLDialogElement>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
  canClose?: boolean
  open?: boolean
  toggleOpen?: (open: boolean) => void
}
export default function PlayerNameDialog({
  dialogRef,
  handleSubmit,
  children,
  canClose,
  open,
  toggleOpen
}: Props) {


  const [dialogStyles, setDialogStyles] = useState({
    display: open ? "flex" : "none",
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
    toggleOpen!(false)
    setDialogStyles({ ...dialogStyles, display: "none" })
  }

  useEffect(() => {
    if (open) {
      setDialogStyles({ ...dialogStyles, display: "flex" })
    } else {
      setDialogStyles({ ...dialogStyles, display: "none" })
    }
  }, [open, dialogStyles])

  const onSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    handleClose()
  }
  return (
    <dialog open={open} style={dialogStyles} role="dialog" ref={dialogRef} className="user-form-dialog">
      <form onSubmit={onSubmitted} className="user-form">
        {canClose && <button onClick={handleClose} role="close-dialog" className="close-dialog-button">x</button>}
        {children}
      </form>
    </dialog>
  )
}
