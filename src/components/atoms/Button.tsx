import '../../assets/components/button.scss'
interface Props {
  content: string
  onClick?: () => void
  disabled?: boolean
  submit?: boolean
  className?: string
}
export default function Button({
  content,
  onClick,
  disabled,
  submit,
  className,
}: Props) {
  return (
    <button
      className={`basic-button ${className}`}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled ?? false}
    >
      {content}
    </button>
  )
}
