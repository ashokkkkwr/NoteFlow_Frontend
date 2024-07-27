import { useState } from 'react'
import { IoIosEyeOff, IoMdEye } from 'react-icons/io'
interface IInput {
  name: string
  type: string
  placeholder?: string
  autocomplete?: 'on' | 'off'
  disabled?: boolean
  onChange?: any
  multiple?:any
  
}
const InputField: React.FC<IInput> = ({ name, type, placeholder, autocomplete = 'off', onChange, disabled,multiple}) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <input
          className="placeholder-gray-500"

        type={showPassword ? 'text' : type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autocomplete}
        onChange={onChange}
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
