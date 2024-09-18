import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NoteState from 'context/NoteState'
import LandingPageTemplate from '@ui/common/templates/LandingPage.templete'
import Signup from '@ui/common/pages/Signup'
import Login from '@ui/common/pages/Login'
import AuthTemplete from '@ui/common/templates/AuthTemplete'
import FriendRequest from '@ui/common/pages/FriendRequest'
import AddFriends from '@ui/common/pages/AddFriends'
import ViewFriends from '@ui/common/pages/ViewFriends'
import Landing from '@ui/common/pages/Landing'
import Profile from '@ui/common/pages/Profile'
import UserDetails from '@ui/common/pages/UserDetail'
import ProtectedRoute from './ProtectedRoute'
import ViewAllFriends from '@ui/common/pages/ViewAllFriend'
import Settings from '@ui/common/pages/Settings'
import ViewAllUser from '@ui/common/pages/ViewAllUser'
import Logout from '@ui/common/molecules/Logout'
import ChatOrganism from '@ui/common/organism/Chat.organsim'
import userContext from '@context/User/UserContext'
import axiosInstance from 'services/instance'
import { io } from 'socket.io-client'
import { SocketProvider } from '@context/SocketContext'
import './index.css'
import { SidebarProvider } from './context/SidebarContext'
import { RightSidebarProvider } from '@context/RightSidebarContext'
import { AutoCorrectProvider } from '@context/AutoCorrectContext'
import AboutUs from '@ui/common/pages/AboutUs'
// import NotificationComponent from './NotificationComponent';

const socket = io('http://localhost:5000', {
  auth: {
    token: sessionStorage.getItem('accessToken'),
  },
})

interface User {
  id: string
  createdAt: any
  details: {
    first_name: string
    last_name: string
    phone_number: string
    profileImage: Media[]
  }
  email: string
  role: string
}

interface Media {
  id: string
  path: string
}

const router = createBrowserRouter([
  // Landing page
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LandingPageTemplate />
        {/* <NotificationComponent /> */}
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Landing /> }],
  },
  {
    path: '/auth',
    element: <AuthTemplete />,
    children: [
      { path: 'user/signup', element: <Signup /> },
      { path: 'user/login', element: <Login /> },
      {
        path: 'user/friend-request',
        element: (
          <ProtectedRoute>
            <FriendRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/add-friends',
        element: (
          <ProtectedRoute>
            <AddFriends />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/logout',
        element: (
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/view-friends',
        element: (
          <ProtectedRoute>
            <ViewFriends />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/:id',
        element: (
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/viewAllFriends',
        element: (
          <ProtectedRoute>
            <ViewAllFriends />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/aboutUs',
        element: (
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/ViewAllUser',
        element: (
          <ProtectedRoute>
            <ViewAllUser />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/message',
        element: (
          <ProtectedRoute>
            <ChatOrganism />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

function App() {
  const userActive = async () => {
    try {
      socket.emit('active')
    } catch (error) {
      console.log(error, 'yo chai error')
    }
  }

  useEffect(() => {
    userActive()
  }, [])

  return (
    <AutoCorrectProvider>
      <RightSidebarProvider>
        <SidebarProvider>
          <SocketProvider>
            <NoteState>
              <RouterProvider router={router} />
            </NoteState>
          </SocketProvider>
        </SidebarProvider>
      </RightSidebarProvider>
    </AutoCorrectProvider>
  )
}
export default App
