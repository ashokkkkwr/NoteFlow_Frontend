interface IButton{
    type:'button' | 'submit' | 'reset'
    icon?: React.ReactNode
    buttonText:string
    onClick?:() => void;
}
const Button: React.FC<IButton>=({type,icon,buttonText,onClick})=>{
    return(
        
        <button className="ml-16 mt-4 w-56 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-500 hover:text-white transition-colors duration-300" type={type} onClick={onClick}>
            {icon}
        <span>{buttonText}</span>
        </button>
    )
}
export default Button