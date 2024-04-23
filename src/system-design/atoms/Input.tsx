import "../../assets/components/Input.scss"
import { inputTypes } from "../../lib/constants/declarations"
interface Props {
  label?: string
  type: keyof typeof inputTypes
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name: string
  children?: React.ReactNode
  readonly?: boolean
  defaultValue?: string
}
export default function Input({
  label,
  type,
  onChange,
  placeholder,
  name,
  children,
  readonly,
  defaultValue,
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
        readOnly={readonly ?? false}
        defaultValue={defaultValue ?? ""}
      />
      {children}
    </label>
  )
}
