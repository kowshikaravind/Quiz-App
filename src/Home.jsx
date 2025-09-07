import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hamberger from 'hamburger-react';

function Home() {
  const location = useLocation();
  const { user: stateUser, email: stateEmail } = location.state || {};

  const storedDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
  const [user, setUser] = React.useState(stateUser || storedDetails.user || "");
  const [email, setEmail] = React.useState(stateEmail || storedDetails.email || "");
  const [open , setOpen] = React.useState(false);

  const navigate = useNavigate();
  const loginbutton = user ? 'Logout' : 'Login';

  function handleClick() {
    if (user) {
      localStorage.removeItem("userDetails");
      setUser("");
      setEmail("");
      navigate("/Login");
    } else {
      navigate('/User');
    }
  }

  function handleStart() {
    if (!user) {
      navigate('/User');
    } else {
      navigate('/Quiz', { state: { user, email } });
    }
  }

  function handleSetting() {
    navigate('/Setting', { state: { user, email } });
  }

  return (
    <div>
      <div className='header'>
        <div className='hamberger-menu'>
          <Hamberger toggled={open} toggle={setOpen} />
        </div>
        {open && <div className='hamberger-menu-content'>
          <div className='header-top'>
            <p className='welcome-user'>Welcome {user} !</p>
            <button className='head-btn' onClick={() => navigate('/DailyChallenge')}>Daily Challenge</button>
          </div>
          <div className='header-bottom'>
            <button className='head-btn' onClick={() =>navigate('/Aboutus')}>About us</button>
            <button className='head-btn' onClick={handleClick}>{loginbutton}</button>
            <button className='head-btn' onClick={handleSetting}>Settings</button>
          </div>
          </div>}
      </div>
      <div className='main-content'>
        <h1>The QuizArena Welcomes You</h1>
        <button className='start-btn' onClick={handleStart}>Start Quiz</button>
      </div>
      
    </div>
  );
}

export default Home;
