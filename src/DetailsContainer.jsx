import React from 'react';
import './index.css';
import App from './App.jsx';
import Home from './Home.jsx';
import User from './User.jsx';
import Login from './Login.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function DetailsContainer() {
  const [details, setDetails] = React.useState([]);
  console.log(details);
  async function allDetails({ user, email, password }) {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, email, password })
      });
      const result = await response.json();
      console.log("Register response:", result);
      fetchDetails();
    } catch (err) {
      console.log("Error in allDetails:", err);
    }
  }

  async function fetchDetails() {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setDetails(data.data);
    } catch (err) {
      console.log("Error in fetchDetails:", err);
    }
  }

  React.useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/Home' replace />} />
        <Route path='/User' element={<User allDetails={allDetails} />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Quiz' element={<App />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default DetailsContainer;