import React from 'react';
import './ChoreCard.css'

export default function ChoreCard({ title, dueDate, description }) {
  return (
    <div
      className="card shadow rounded choreCard"  
      style={{ width: '42rem', height:'21rem' }}
    >
      <div className="card-body" >
        <h5 className="card-title">{title}</h5>
        <h4 className="card-due-date">{dueDate}</h4>
        <p className="card-text">{description}</p>
      </div>

      <button className="checkbox" style={{padding:'1rem' }}></button>
    </div>
  );
}