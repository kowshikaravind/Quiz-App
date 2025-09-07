import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleNext() {
    if (user.length < 4) {
      alert("Please enter a username (at least 4 characters)");
    } else if (!user || !email || !password) {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await fetch("https://quiz-app-backend-u344.onrender.com/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, email, password })
        });

        const data = await response.json();
        if (!data.success && data.message === "Email already registered") {
          alert("Email already registered. Please login.");
          navigate("/Login");
        }
        else if (data.success) {
          const userDetails = { user, email };
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          navigate("/Home", { state: userDetails });
        }
        else {
          alert(data.message || "Registration failed.");
        }
      } catch (err) {
        alert("Server error. Please try again later.");
        console.error("Error registering:", err);
      }
    }
  }

  return (
    <div className='user-outer-box'>
      <h1>Register</h1>
      <div className='user-container'>
        <input
          type="text"
          placeholder="Enter your username"
          className='user-input'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your email"
          className='user-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className='user-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='user-next-btn' onClick={handleNext}>Next</button>
        <p className='user-t0-login' onClick={() => navigate('/Login')} style={{color:"blue"}}>
          Already have an account? Login here
        </p>
      </div>
    </div>
  );
}

export default User;
