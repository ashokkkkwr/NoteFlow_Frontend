interface IButton{
    type:'button' | 'submit' | 'reset'
    icon?: React.ReactNode
    buttonText:string
    onClick?:() => void;
}
const Button: React.FC<IButton>=({type,icon,buttonText,onClick})=>{
    return(
        
        <button className="bg-blue-500 text-white py-2 px-4 rounded " type={type} onClick={onClick}>
            {icon}
        <span>{buttonText}</span>
        </button>
    )
}
export default Button