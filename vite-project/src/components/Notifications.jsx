import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Notifications.css'; 

const socket = io('https://sito-be.onrender.com');

const Notifications = ({ newNotificationsCount, resetNewNotificationsCount }) => {
  useEffect(() => {
    socket.on('notification', () => {
      newNotificationsCount((prevCount) => prevCount + 1); // Incrementa il contatore
    });

    return () => {
      socket.off('notification');
    };
  }, [newNotificationsCount]);

  return (
    <div className="notifications">
      <Link to="/notifications" className="btn btn-link" onClick={resetNewNotificationsCount}>
        <i className="bi bi-bell"></i>
        <span className="badge badge-danger">{newNotificationsCount}</span>
      </Link>
    </div>
  );
};

export default Notifications;
