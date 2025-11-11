import React from 'react';
import './ChoreCard.css'

export default function ChoreCard({ title, text }) {
  return (
    <div
      className="card shadow rounded choreCard"  
      style={{ width: '42rem', height:'21rem' }}
    >
      <div className="card-body" >
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>

      <button className="checkbox" style={{padding:'1rem' }}></button>
    </div>
  );
}