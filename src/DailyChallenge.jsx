import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function DailyChallenge() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails?.email) {
      fetch(`https://quiz-app-backend-u344.onrender.com/get-streak?email=${userDetails.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStreak(data.streak);
          }
        })
        .catch(err => console.error("Error fetching streak:", err));
    }
  }, []);

  function handleSubmit() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    navigate('/Quiz', { state: { isDailyChallenge: true, user: userDetails.user, email: userDetails.email } });
  }

  return (
    <div className="daily-challenge-container">
      <div className="streak-info">
        <p>🔥 Your Streak: {streak} days</p>
      </div>
      <div className="daily-challenge-box">
        <h2>Daily Challenge</h2>
        <p>Start your Daily Challenge</p>
        <button className='daily-challenge-btn' onClick={handleSubmit}>Start</button>
      </div>
    </div>
  );
}

export default DailyChallenge;
