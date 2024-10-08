
interface ILabel {
    name:string
    label:string
    required?:boolean

}
const Label:React.FC<ILabel>= ({name,label,required})=>{
    return(
        <label className="text-lg" htmlFor={name}>
            {label}
            
        </label>
    )
}
export default Label 