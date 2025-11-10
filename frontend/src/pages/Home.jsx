import './Home.css'

import './Home.css';
import { useNavigate } from 'react-router-dom'
import ChoreList from './ChoreList'

export default function Home() {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('./ChoreList')
  }
    return (
      <div className="home-page">
        <h1>Home</h1>
        <p1>Welcome! This is your public homepage.</p1>
      </div>
    );
  }
  