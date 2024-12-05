// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import Logout from '../components/Logout';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState(null);
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(firestore, 'users', userId));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      };

      fetchUserData();

      const q = query(collection(firestore, 'habits'), where('userId', '==', userId), where('completed', '==', false));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const habitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHabits(habitsData);
      });
      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    const checkCompletedDates = async () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toISOString().split('T')[1];
      for (const habit of habits) {
        if (habit.lastCompletedDate === currentDate && currentTime >= "23:59:00") {
          const habitDoc = doc(firestore, 'habits', habit.id);
          await updateDoc(habitDoc, {
            completed: true,
          });
        }
      }
    };

    const interval = setInterval(checkCompletedDates, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [habits]);

  const handleHabitUpdated = (updatedHabit) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
    );
  };

  const handleHabitDeleted = (habitId) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        {user && <p>Welcome, {user.name}</p>}
        <Logout />
      </div>
      <div className="dashboard-content">
        <AddHabitModal userId={userId} />
        {habits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onHabitUpdated={handleHabitUpdated}
            onHabitDeleted={handleHabitDeleted}
          />
        ))}
        <button onClick={() => navigate('/history')} className="button view-history-button">View History</button>
      </div>
    </div>
  );
};

export default Dashboard;