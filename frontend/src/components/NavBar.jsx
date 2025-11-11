import { Link } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/Home">Home</Link>
        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Calendar">Calendar</Link>
        <Link to="/Chores">Chores</Link>
        <Link to="/Bills">Bills</Link>
      </div>

      <div className="navbar-right">
        <Link to="/Profile" className="user-profile">Profile</Link>
        <Link to="/Login" className="navbar-signin">Sign In</Link>
      </div>
    </nav>
  );
}
