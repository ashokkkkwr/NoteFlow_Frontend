import { createContext } from "react";
interface User {
    id: string;
    createdAt: any;
    details: {
      first_name: string;
      last_name: string;
      phone_number: string;
      profileImage: Media[];
    };
    email: string;
    role: string;
  }
  
  interface Media {
    id: string;
    path: string;
  }
interface UserContextType{
    currentUser:User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const initialUserContext:UserContextType={
    currentUser:null,
    setCurrentUser:()=>{}
}
const userContext=createContext<UserContextType>(initialUserContext)
export default userContext