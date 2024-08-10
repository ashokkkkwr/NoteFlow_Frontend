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
    contextCurrentUser:User | null;
    setContextCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const initialUserContext:UserContextType={
    contextCurrentUser:null,
    setContextCurrentUser:()=>{}
}
const userContext=createContext<UserContextType>(initialUserContext)
export default userContext