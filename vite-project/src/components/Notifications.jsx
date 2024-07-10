import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://sito-be.onrender.com');

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    });
  }, []);

  return (
    <div className="notifications">
      <h2>Notifiche</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
