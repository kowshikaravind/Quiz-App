import { Link } from 'react-router-dom'
import {useLocation ,useNavigate} from 'react-router-dom'
import User from './User.jsx'
function Home() {
  const location = useLocation();
  const {user} = location.state || {user : ''};
  const navigate = useNavigate();
  function handleClick(){
    navigate('/User');
  }
  return (
    <div>
      <div className='header'>
        <div className='header-left'>
          <p className='welcome-user'>Welcome {user} !</p>
        </div>
        <div className='header-right'>
          <button className='head-btn'>Invite your friends</button>
          <button className='head-btn'>About us</button>
          <button className='head-btn'onClick={handleClick}>Log Out</button>
        </div>
      </div>
      <div className='main-content'>
        <h1>The Quiz World Welcomes You</h1>
        <Link to='/Quiz'><button className='start-btn'>Start Quiz</button></Link>
      </div>
    </div>
  )
}

export default Home