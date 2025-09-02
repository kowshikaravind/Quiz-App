import React from 'react'
import './index.css'

import {Navigate, useNavigate } from 'react-router-dom'
function User() {
  const navigate = useNavigate();
  const [user , setUser]=React.useState('');
  const handleChange = (e) => {
    setUser(e.target.value);
  };
  function handleNext(){
    if(user.length < 4){
      alert("Please Enter a User Name and Length Should be Greater than 4 ");
    }
    else{
      navigate('/Home',{state:{user}});
    }
  }
  
  return (
    <div className='user-outer-box' >
      <h1>Enter Your Name</h1>
      <div className='user-container' >
        <input
          type="text"
          placeholder="Enter your name"
          className='user-input'
          value={user}
          onChange={handleChange}
        />
        <button className='user-next-btn' onClick={handleNext} >Next</button>
      </div>
    </div>
  )
}

export default User