import { FC } from "react"

type Props = {
  value: string
  placeholder?: string
  onChange: (val: string) => void
}
const Input: FC<Props> = ({ value, onChange, placeholder = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export default Input
