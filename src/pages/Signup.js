// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("Signup button clicked");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(firestore, 'users', user.uid), {
        name,
        email,
      });
      console.log("Signup successful");
      toast.success("Signup successful!");
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Signup</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="input"
      />
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
      <button onClick={handleSignup} className="button">Sign Up</button>
      <button onClick={() => navigate('/login')} className="button">Go to Login</button>
    </div>
  );
};

export default Signup;