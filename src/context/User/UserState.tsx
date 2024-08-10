import React, { ReactNode, useState } from 'react';
import userContext from "./UserContext";
interface UserStateProps {
    children: ReactNode;
}
interface User {
    id: string,
    createdAt: any,
    details: {
        first_name: string,
        last_name: string,
        phone_number: string,
        profileImage: Media[]
    },
    email: string,
    role: string
}

interface Media {
    id: string;
    path: string;
}

const UserState: React.FC<UserStateProps> = ({ children }) => {
    const [contextCurrentUser, setContextCurrentUser] = useState<User | null>(null)
    return (
        <userContext.Provider value={{ contextCurrentUser, setContextCurrentUser }}>
            {children}
        </userContext.Provider>
    );
}

export default UserState;
