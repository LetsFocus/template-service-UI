import React from 'react';
import './Header.css';

const Header = ({ onAddNew }) => {
  return (
    <header className="header">
      <h1>Choose Customize Here</h1>
      <button className="add-new-btn" onClick={onAddNew}>Add New</button>
    </header>
  );
};

export default Header;
