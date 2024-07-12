import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom'; // Importa il componente Link
import 'bootstrap-icons/font/bootstrap-icons.css'; // Assicurati di avere le icone di Bootstrap

const socket = io('https://sito-be.onrender.com');

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div className="notifications">
      <Link to="/notifications" className="btn btn-link">
        <i className="bi bi-bell"></i>
        {notifications.length > 0 && (
          <span className="badge badge-danger">{notifications.length}</span>
        )}
      </Link>
    </div>
  );
};

export default Notifications;
