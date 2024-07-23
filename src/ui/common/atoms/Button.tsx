interface IButton{
    type:'button' | 'submit' | 'reset'
    icon?: React.ReactNode
    buttonText:string
    onClick?:() => void;
}
const Button: React.FC<IButton>=({type,icon,buttonText,onClick})=>{
    return(
        <button type={type} onClick={onClick}>
            {icon}
        <span>{buttonText}</span>
        </button>
    )
}
export default Button