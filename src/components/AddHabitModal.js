// src/components/AddHabitModal.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const AddHabitModal = ({ userId }) => {
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('Daily');

  const handleAddHabit = async () => {
    console.log("Add Habit button clicked");
    try {
      await addDoc(collection(firestore, 'habits'), {
        userId,
        name: habitName,
        frequency,
        completedDates: [],
        completed: false,
      });
      console.log("Habit added successfully");
      setHabitName('');
      setFrequency('Daily');
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  return (
    <div>
      <h2>Add Habit</h2>
      <input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Habit Name"
        className="input"
      />
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="input frequency-selector">
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
      </select>
      <button onClick={handleAddHabit} className="button">Add Habit</button>
    </div>
  );
};

export default AddHabitModal;