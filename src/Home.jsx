import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const { user: stateUser } = location.state || {};
  const [user, setUser] = React.useState(stateUser || localStorage.getItem("user") || "");
  
  const navigate = useNavigate();
  const loginbutton = user ? 'Logout' : 'Login';

  function handleClick() {
    if (user) {
      localStorage.removeItem("user");
      setUser("");
      navigate("/Login");
    } else if (loginbutton === 'Logout') {
      localStorage.removeItem("user");
      setUser("");
      navigate("/User");
    } else {
      navigate('/User');
    }
  }

  function handleStart() {
    if (!user) {
      navigate('/User');
    } else {
      navigate('/Quiz', { state: { user } });
    }
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
          <button className='head-btn' onClick={handleClick}>{loginbutton}</button>
        </div>
      </div>
      <div className='main-content'>
        <h1>The QuizArena Welcomes You</h1>
        <button className='start-btn' onClick={handleStart}>Start Quiz</button>
      </div>
    </div>
  );
}

export default Home;