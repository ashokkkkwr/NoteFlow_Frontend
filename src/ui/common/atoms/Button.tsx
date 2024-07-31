interface IButton{
    type:'button' | 'submit' | 'reset'
    icon?: React.ReactNode
    buttonText:string
    onClick?:() => void;
}
const Button: React.FC<IButton>=({type,icon,buttonText,onClick})=>{
    return(
        
        <button className="ml- mt- w-48 h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-base hover:bg-red-500 hover:text-white transition-colors duration-300">
            {icon}
        <span>{buttonText}</span>
        </button>
    )
}
export default Button