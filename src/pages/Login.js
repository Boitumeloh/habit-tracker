// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      toast.success("Login successful!");
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input"
      />
      <button onClick={handleLogin} className="button">Login</button>
      <button onClick={() => navigate('/signup')} className="button">Go to Signup</button>
    </div>
  );
};

export default Login;