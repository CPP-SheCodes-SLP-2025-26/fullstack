import React from 'react';

export default function Chorecard({ title, text }) {
  return (
    <div
      className="card shadow rounded mb-4 
                 p-3 p-md-4 p-lg-5"  
      style={{ width: '25rem' }}
    >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
}