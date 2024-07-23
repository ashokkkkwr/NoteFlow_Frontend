import { useState } from 'react'
import { IoIosEyeOff, IoMdEye } from 'react-icons/io'
interface IInput {
  name: string
  type: string
  placeholder?: string
  autocomplete?: 'on' | 'off'
  disabled?: boolean
}
const InputField: React.FC<IInput> = ({ name, type, placeholder, autocomplete = 'off', disabled }) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div>
      <input
        type={showPassword ? 'text' : type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autocomplete}
      />
      {type === 'password' && (
        <button type='button' onClick={togglePassword}>
          {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
        </button>
      )}
    </div>
  )
}
export default InputField
