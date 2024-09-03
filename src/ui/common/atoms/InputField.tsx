import { useState } from 'react';
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';

interface IInput {
  name: string;
  type: string;
  placeholder?: string;
  autocomplete?: 'on' | 'off';
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  multiple?: boolean;
  value?:any
}

const InputField: React.FC<IInput> = ({ 
  name, 
  type, 
  placeholder, 
  autocomplete = 'off', 
  onChange, 
  disabled, 
  value,
  multiple 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-80">
      <input
        className={`placeholder-gray-500 border rounded-lg w-full h-10 px-3 py-2 text-gray-900 focus:outline-none focus:border-black ${
          isFocused ? 'border-black' : 'border-gray-300'
        }`}
        type={showPassword && type === 'password' ? 'text' : type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autocomplete}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiple={multiple}
        value={value}
      />
      {type === 'password' && (
        <button 
          type="button" 
          onClick={togglePassword} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
        </button>
      )}
    </div>
  );
};

export default InputField;
