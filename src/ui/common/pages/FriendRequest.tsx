import { useContext, useEffect } from "react"
import noteContext from "context/NoteContext"
import Posts from "../organism/Posts"
import LeftSidebar from "../organism/LeftSidebar"
import Navbar from '@ui/common/organism/Navbar'
import RightSidebar from "../organism/RightSidebar"
import RightSidebarDown from "../organism/RightSidebarDown"
import Profiles from "../organism/Profiles"
import FriendRequests from "../organism/FriendRequests"

const FriendRequest = () => {
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
                        <FriendRequests />
                        </div>
                      
                    </div>
                </div>
              


            </div>

        </>
    )
}
export default FriendRequest


