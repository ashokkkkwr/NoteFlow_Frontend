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

            <div className="flex ">

                {/* {a.state.name} */}
                <div className="">

                <LeftSidebar />
                </div>
                <div className="flex-grow">
                    <Navbar />
                    <div className="flex  justify-between">
                        <div >
                        <Posts />
                        </div>
                        <div >
                            <div className="bg-white mt-10 w-80 h-96">
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


