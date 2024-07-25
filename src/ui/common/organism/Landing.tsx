import { useContext, useEffect } from "react"
import noteContext from "context/NoteContext"
import Posts from "../molecules/Posts"
const Landing =()=>{
    const a = useContext(noteContext)
    useEffect(()=>{
        a.update()
    },[])
    return(
       
        <div>
            <div>Home Page welcomes {a.state.name}</div>

            <Posts />

        </div>
    )
}
export default Landing


