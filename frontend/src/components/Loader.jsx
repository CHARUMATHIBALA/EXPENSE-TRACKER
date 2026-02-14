import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  return (
    <div className={`loader-container loader-${size}`}>
      <div className="loader-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
