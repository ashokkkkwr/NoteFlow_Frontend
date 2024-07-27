import { useContext, useEffect } from "react"
import noteContext from "context/NoteContext"
import Posts from "../organism/Posts"
import LeftSidebar from "../organism/LeftSidebar"
const Landing =()=>{
    const a = useContext(noteContext)
    useEffect(()=>{
        a.update()
    },[])
    return(
       
        <div>
            {/* <div>Home Page welcomes {a.state.name}</div> */}
            
        <LeftSidebar />
            <Posts />

        </div>
    )
}
export default Landing


