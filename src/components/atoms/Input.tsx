import '../../assets/components/Input.scss'
interface Props {
  label?: string
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'time'
    | 'file'
    | 'checkbox'
    | 'radio'
    | 'color'
    | 'range'
    | 'search'
    | 'tel'
    | 'url'
    | 'week'
    | 'month'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name: string
  children?: React.ReactNode
}
export default function Input({
  label,
  type,
  onChange,
  placeholder,
  name,
  children,
}: Props) {
  return (
    <label className="input-with-label">
      {label}
      <input
        autoComplete="off"
        className="basic-input"
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
      {children}
    </label>
  )
}
