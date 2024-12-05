// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful!");
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out: " + error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">Logout</button>
  );
};

export default Logout;