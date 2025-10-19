import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{display:'flex',gap:12,padding:'12px 16px',background:'#f5f5f5'}}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login" style={{marginLeft:'auto'}}>Sign in</Link>
    </nav>
  );
}
