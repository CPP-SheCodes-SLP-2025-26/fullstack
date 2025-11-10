import { Link } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* <Link to="/>Home"</Link> */}
      <Link to="/Home">Home</Link>
      <Link to="/Dashboard">Dashboard</Link>
      <Link to="/Calendar">Calendar</Link>
      <Link to="/Chores">Chores</Link>
      <Link to="/Bills">Bills</Link>

      <Link to="/Profile" className="user-profile">Profile</Link>
      <Link to="/Login" className="navbar-signin">Sign In</Link>
    </nav>
  );
}
