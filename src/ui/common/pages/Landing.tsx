import {  useEffect, useState } from "react"
import Posts from "../organism/Posts"
import LeftSidebar from "../organism/LeftSidebar"
import Navbar from '@ui/common/organism/Navbar'
import RightSidebar from "../organism/RightSidebar"
import RightSidebarDown from "../organism/RightSidebarDown"

const Landing = () => {
    // const a = useContext(noteContext)
    const [refreshPosts, setRefreshPosts] = useState(0);
    const [testId, setTestId] = useState<string | null>(null);  

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
                <Navbar testId={testId || ''}  />
                <p>test:{testId}</p>
                <div className="flex  justify-between">
                        <div >
                        <Posts refreshPosts={refreshPosts} />
                        </div>
                        <div className="fixed right-0">
                        <RightSidebar setTestId={setTestId}  /> {/* Pass the setters as props */}
                            
                            <RightSidebarDown onPostAdded={handlePostAdded} />
                            </div>
                    </div>
                </div>
              


            </div>

        </>
    )
}
export default Landing


