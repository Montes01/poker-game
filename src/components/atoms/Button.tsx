import '../../assets/components/button.scss'
interface Props {
  content: string
  onClick?: () => void
  disabled?: boolean
  submit?: boolean
}
export default function Button({ content, onClick, disabled, submit }: Props) {
  return (
    <button
      className="basic-button"
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled ?? false}
    >
      {content}
    </button>
  )
}
