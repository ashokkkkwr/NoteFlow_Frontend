import { useContext, useEffect } from "react"
import noteContext from "context/NoteContext"
const Landing =()=>{
    const a = useContext(noteContext)
    useEffect(()=>{
        a.update()
    },[])
    return(
       
        <div>
            <div>Home Page welcomes {a.state.name}</div>

        </div>
    )
}
export default Landing


