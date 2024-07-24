import react from "react"
import noteContext from "./NoteContext"
import { useState } from "react"
const NoteState = (props:any) =>{
    const s1 = {
        "name":"Harry",
        "class":"5b"
    }
    const [state,setState] = useState(s1)

    const update = ()=>{
        setTimeout(()=>{
           setState({
            "name":"Larry",
            "class":"10b"

           })

        },1000)
    }
    return (
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
    
}
export default NoteState
