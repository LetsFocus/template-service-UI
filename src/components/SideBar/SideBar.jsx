import React, { useState } from 'react';
import './SideBar.css'; 
import { CgProfile } from "react-icons/cg";
import { Link, Outlet } from "react-router-dom";
import { FcSms, FcRules } from "react-icons/fc";
import { MdMarkEmailUnread } from "react-icons/md";


const Sidebar = () => {
  const [active, setActive] = useState('');

  const handleClick = (query) => {
    setActive(query);
  };

  return (
    <div className="sidebar">
      <div className="top-sidebar">
        <Link 
          to="/template?service=mail" 
          className={`link ${active === 'mail' ? 'active' : ''}`} 
          onClick={() => handleClick('mail')}
        >
          <span className="icon"><MdMarkEmailUnread /></span>
          <span className="label">Mail</span>
          <span className="tooltip">Mail</span>
        </Link>
        <Link 
          to="/template?service=invoice" 
          className={`link ${active === 'invoice' ? 'active' : ''}`} 
          onClick={() => handleClick('invoice')}
        >
          <span className="icon"><FcRules /></span>
          <span className="label">Invoice</span>
          <span className="tooltip">Invoice</span>
        </Link>
        <Link 
          to="/template?service=messages" 
          className={`link ${active === 'messages' ? 'active' : ''}`} 
          onClick={() => handleClick('messages')}
        >
          <span className="icon"><FcSms /></span>
          <span className="label">Messages</span>
          <span className="tooltip">Messages</span>
        </Link>
        <Link 
          to="/template?service=notification" 
          className={`link ${active === 'notification' ? 'active' : ''}`} 
          onClick={() => handleClick('notification')}
        >
          <span className="icon">🔔</span>
          <span className="label">Notification</span>
          <span className="tooltip">Notification</span>
        </Link>
      </div>
      <div className="bottom-sidebar">
        <Link 
          to="/template?service=profile" 
          className={`link ${active === 'profile' ? 'active' : ''}`} 
          onClick={() => handleClick('profile')}
        >
          <span className="icon"><CgProfile /></span>
          <span className="label">Profile</span>
          <span className="tooltip">Profile</span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
