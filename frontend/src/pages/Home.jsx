import './Home.css';
import { useNavigate } from 'react-router-dom'
import ChoreList from './ChoreList'

export default function Home() {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('./ChoreList')
  }
    return (
      <div className="Home" style={{padding:20}}>
        <h1>Home</h1>
        <p>Welcome! This is your public homepage.</p>

         <div className="container mt-5">
      <button className="btn btn-primary" onClick={handleClick}>See all Chores</button>
    </div>
      </div>
    );
  }
  