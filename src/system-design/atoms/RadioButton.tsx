import '../../assets/components/radio-button.scss'
interface Props {
  name: string
  label: string
  value: string
  defaultChecked?: boolean
}
export default function RadioButton({
  name,
  label,
  defaultChecked,
  value,
}: Props) {
  return (
    <label className="radio-button-wrapper">
      <input
        value={value}
        className="radio-button"
        type="radio"
        name={name}
        defaultChecked={defaultChecked ?? false}
      />
      {label}
    </label>
  )
}
