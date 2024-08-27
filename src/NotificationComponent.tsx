import React, { useEffect } from 'react';

// Hook to request notification permission
const useNotificationPermission = () => {
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);
};

// Function to send a notification
const sendNotification = (title:any, options:any) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, options);

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } else {
    console.log('Notifications are not permitted');
  }
};

// Notification component
const NotificationComponent = () => {
  useNotificationPermission();

  const handleNotify = () => {
    sendNotification('New Message', {
      body: 'You have a new message!',
      icon: '/notification-icon.png', // Replace with your icon path
      requireInteraction: false,      // Set to true if you want the notification to stay until clicked
      tag: 'unique-notification',      // Replace existing notification with the same tag
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Notification Demo</h2>
      <button onClick={handleNotify}>Notify Me!</button>
    </div>
  );
};

export default NotificationComponent;
