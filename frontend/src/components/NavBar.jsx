import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  const location = useLocation();
  const onDashboard = location.pathname.toLowerCase() === "/dashboard";

  console.log("Current path:", location.pathname);

  return (
    <nav className="navbar">
      {/* {!onDashboard && ( */}
        <div className="navbar-links">
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>

          {/* Add These In The Dashboard */}
          {<Link to="/calendar">Calendar</Link>}
          {/* <Link to="/chores">Chores</Link> */}
          {/* <Link to="/bills">Bills</Link> */}
        </div>
      {/* )} */}

      <div className="navbar-right">
        <Link to="/profile" className="user-profile">Profile</Link>
        <Link to="/login" className="navbar-signin">Sign In</Link>
      </div>
    </nav>
  );
}