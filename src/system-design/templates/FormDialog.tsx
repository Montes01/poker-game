interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>
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
  const handleClose = () => {
    dialogRef.current?.close()
  }
  return (
    <dialog open={open} role="dialog" ref={dialogRef} className="user-form-dialog">
      <form onSubmit={handleSubmit} className="user-form">
        {canClose && <button onClick={handleClose} role="close-dialog" className="close-dialog-button">x</button>}
        {children}
      </form>
    </dialog>
  )
}
