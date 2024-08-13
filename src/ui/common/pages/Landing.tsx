import { useState } from "react";
import Posts from "../organism/Posts";
import LeftSidebar from "../organism/LeftSidebar";
import Navbar from '@ui/common/organism/Navbar';
import RightSidebar from "../organism/RightSidebar";
import RightSidebarDown from "../organism/RightSidebarDown";

const Landing = () => {
  const [refreshPosts, setRefreshPosts] = useState(0);
  const [testId, setTestId] = useState<string | null>(null);
  const [senderDetails, setSenderDetails] = useState<any>(null);


  const handlePostAdded = () => {
    setRefreshPosts((prev) => prev + 1);
  };

  const handleSetTestId = (id: string | null, senderDetails: any) => {
    console.log("Test ID:", id);
    console.log("Sender Details:", senderDetails);
    setTestId(id);
    setSenderDetails(senderDetails);
  };
  return (
    <>
      <div className="flex ">
        <div className="">
          <LeftSidebar />
        </div>
        <div className="flex-grow">
        <Navbar testId={testId || ''} senderDetails={senderDetails} />
        <p>test: {testId}</p>
          <div>
            <p>Sender ID: {senderDetails?.id}</p>
            <p>Email: {senderDetails?.email}</p>
            
            {/* Add more properties as needed */}
          </div>
    
          <div className="flex justify-between">
            <div>
              <Posts refreshPosts={refreshPosts} />
            </div>
            <div className="fixed right-0">
              <RightSidebar setTestId={handleSetTestId} />
              <RightSidebarDown onPostAdded={handlePostAdded} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
