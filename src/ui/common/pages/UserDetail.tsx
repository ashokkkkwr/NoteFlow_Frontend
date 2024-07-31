import { useContext, useEffect } from "react"
import noteContext from "context/NoteContext"
import Posts from "../organism/Posts"
import LeftSidebar from "../organism/LeftSidebar"
import Navbar from '@ui/common/organism/Navbar'
import RightSidebar from "../organism/RightSidebar"
import RightSidebarDown from "../organism/RightSidebarDown"
import Profiles from "../organism/Profiles"
import UserDetails from "../organism/UserDetails"

const Profile = () => {
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
                        <div className="ml-[vh]">
                        <UserDetails />
                        </div>
                        <div className="fixed right-0">
                            <RightSidebar />
                            
                            <RightSidebarDown />
                        </div>
                    </div>
                </div>
              


            </div>

        </>
    )
}
export default Profile


