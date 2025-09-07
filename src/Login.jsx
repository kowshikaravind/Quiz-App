import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email || !password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.success) {
        const userDetails = { user: data.user.user, email: data.user.email };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        alert("Login successful");
        navigate("/Home", { state: userDetails });
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Server error. Please try again later.");
    }
  }

  return (
    <div >
      <h1>Login Page</h1>
      <div className='Login-container'>
        <input
          className='login-email'
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='login-password'
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login-button' onClick={handleSubmit}>
          Login
        </button>
        <p className='login-t0-register' onClick={() => navigate('/User')}>
          New user? Register here
        </p>
      </div>
    </div>
  );
}

export default Login;
