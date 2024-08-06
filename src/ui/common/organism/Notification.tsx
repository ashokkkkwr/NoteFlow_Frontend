import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface Notification {
  senderId: string;
  content: string;
  senderProfileImage?: string;
}

const socket = io('http://localhost:5000', {
  auth: {
    token: sessionStorage.getItem('accessToken')
  }
});
const NotificationsComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    socket.on('messageNotification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });
    return () => {
      socket.off('messageNotification');
    };
  }, []);
  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification.senderProfileImage && (
            <img
              src={notification.senderProfileImage}
              alt="Sender"
              className="profile-image"
            />
          )}
          <p>{notification.content}</p>
        </div>
      ))}
    </div>
  );
};
export default NotificationsComponent;