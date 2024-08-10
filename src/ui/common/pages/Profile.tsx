import { useContext, useEffect, useState } from "react"
import noteContext from "context/NoteContext"
import Posts from "../organism/Posts"
import LeftSidebar from "../organism/LeftSidebar"
import Navbar from '@ui/common/organism/Navbar'
import RightSidebar from "../organism/RightSidebar"
import RightSidebarDown from "../organism/RightSidebarDown"
import Profiles from "../organism/Profiles"

const Profile = () => {
    
    
    const [refreshPosts, setRefreshPosts] = useState(0);

    const handlePostAdded = () => {
        setRefreshPosts((prev) => prev + 1);
    };
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
                        <Profiles />
                        </div>
                        <div className="fixed right-0">
                            <RightSidebar />
                            
                            <RightSidebarDown onPostAdded={handlePostAdded} />
                        </div>
                    </div>
                </div>
              


            </div>

        </>
    )
}
export default Profile


