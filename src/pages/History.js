// src/pages/History.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import HabitCard from '../components/HabitCard';
import Logout from '../components/Logout';

const History = () => {
  const [habits, setHabits] = useState([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const q = query(collection(firestore, 'habits'), where('userId', '==', userId), where('completed', '==', true));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const habitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHabits(habitsData);
      });
      return () => unsubscribe();
    }
  }, [userId]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">History</h1>
        <Logout />
      </div>
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onHabitUpdated={() => {}}
          onHabitDeleted={() => {}}
        />
      ))}
    </div>
  );
};

export default History;