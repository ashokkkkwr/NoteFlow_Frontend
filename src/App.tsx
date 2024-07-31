import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NoteState from 'context/NoteState';
import LandingPageTemplate from '@ui/common/templates/LandingPage.templete';
import Signup from '@ui/common/pages/Signup';
import Login from '@ui/common/pages/Login';
import AuthTemplete from '@ui/common/templates/AuthTemplete';
import FriendRequest from '@ui/common/pages/FriendRequest';
import AddFriends from '@ui/common/pages/AddFriends';
import ViewFriends from '@ui/common/pages/ViewFriends';
import Landing from '@ui/common/pages/Landing';
import Profile from '@ui/common/pages/Profile';
import UserDetails from '@ui/common/pages/UserDetail';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import ViewAllFriends from '@ui/common/pages/ViewAllFriend';
import Settings from '@ui/common/pages/Settings';

const router = createBrowserRouter([
  // Landing page
  {
    path: '/',
    element: ( <ProtectedRoute><LandingPageTemplate /></ProtectedRoute>),
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
    ],
  },
]);

function App() {
  return (
    <NoteState>
      <RouterProvider router={router} />
    </NoteState>
  );
}

export default App;
