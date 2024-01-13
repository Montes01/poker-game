interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
}
export default function PlayerNameDialog({
  dialogRef,
  handleSubmit,
  children,
}: Props) {
  return (
    <dialog ref={dialogRef} className="user-form-dialog">
      <form onSubmit={handleSubmit} className="user-form">
        {children}
      </form>
    </dialog>
  )
}
