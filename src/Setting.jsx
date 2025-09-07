import React from 'react'
import './index.css'
import { useLocation } from 'react-router-dom'
import profile from './images/pro.png'

function Setting({theme,setTheme}){
  const location = useLocation();
  let user = "", email = "";
  if (location.state && location.state.user) {
    user = location.state.user;
    email = location.state.email || "";
  } else {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    user = userDetails.user || "";
    email = userDetails.email || "";
  }
  const [showDetails , setShowDetails] = React.useState(false);
  
  function handleProfile(){
    setShowDetails(!showDetails);
  }
  function handleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }


  return (
    <div className='setting-container' >
      <button className='profile-container' onClick={handleProfile}>
        <img src={profile} className='profile-img' />
        <button className='profile-btn' >Profile</button>
      </button>
      <div>
        {showDetails && (
          <div>
            <h1>Profile</h1>
            <p>Username: {user}</p>
            <p>Email: {email}</p>
          </div>
        )}
      </div>
      <button className='theme-container' onClick={handleTheme}>
        <p className='theme-btn'>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </p>
      </button>
    </div>
  )
}

export default Setting