interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
  canClose?: boolean
}
export default function PlayerNameDialog({
  dialogRef,
  handleSubmit,
  children,
  canClose,
}: Props) {
  const handleClose = () => {
    dialogRef.current?.close()
  }
  return (
    <dialog ref={dialogRef} className="user-form-dialog">
      <form onSubmit={handleSubmit} className="user-form">
        {canClose && <button onClick={handleClose} className="close-dialog-button">x</button>}
        {children}
      </form>
    </dialog>
  )
}
