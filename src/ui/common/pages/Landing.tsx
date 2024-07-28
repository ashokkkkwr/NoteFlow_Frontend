import { useContext, useEffect } from "react"
import noteContext from "context/NoteContext"
import Posts from "../organism/Posts"
import LeftSidebar from "../organism/LeftSidebar"
import Navbar from '@ui/common/organism/Navbar'
import RightSidebar from "../organism/RightSidebar"

const Landing = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update()
    }, [])
    return (
        <>
            <div className="flex">
                {/* <div>Home Page welcomes {a.state.name}</div> */}

                <LeftSidebar />
                <div className="flex-grow">
                    <Navbar />
                    <div className="flex bg-white justify-between">
                        <Posts />
                        <div className="bg-white ">
                            <div className="">
                            <RightSidebar />
                            </div>
                            <p>buttom</p>
                        </div>
                    </div>
                </div>
                <div>

                </div>


            </div>

        </>
    )
}
export default Landing


