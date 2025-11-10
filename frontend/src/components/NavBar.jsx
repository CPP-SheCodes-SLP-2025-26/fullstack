import { Link } from "react-router-dom";
import "./NavBar.css";
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={{display:'flex',gap:12,padding:'12px 16px',background:'#f5f5f5'}}>
      {/* <Link to="/>Home"</Link> */}
      <Link to="/Home">Home</Link>
      <Link to="/Dashboard">Dashboard</Link>
      <Link to="/Calendar">Calendar</Link>
      <Link to="/Chores">Chores</Link>
      <Link to="/Bills">Bills</Link>

      <Link to="/Profile" className="user-profile">Profile</Link>
      <Link to="/Login" className="navbar-signin">Sign In</Link>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      {/* Change links on top depending on current page: ChoreList */}
      {location.pathname === '/ChoreList' ? (
        <Link to="/create-chore" style={{ marginLeft: 'auto' }}>Create Chore</Link>
      ) : (
        <Link to="/login" style={{ marginLeft: 'auto' }}>Sign in</Link>
      )}
    </nav>
  );
}