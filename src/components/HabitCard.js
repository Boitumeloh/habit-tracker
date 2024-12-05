// src/components/HabitCard.js
import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const HabitCard = ({ habit, onHabitUpdated, onHabitDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [habitName, setHabitName] = useState(habit.name);
  const [frequency, setFrequency] = useState(habit.frequency);

  const handleUpdateHabit = async () => {
    try {
      const habitDoc = doc(firestore, 'habits', habit.id);
      await updateDoc(habitDoc, {
        name: habitName,
        frequency,
      });
      onHabitUpdated({ ...habit, name: habitName, frequency });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleDeleteHabit = async () => {
    try {
      const habitDoc = doc(firestore, 'habits', habit.id);
      await deleteDoc(habitDoc);
      onHabitDeleted(habit.id);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      const habitDoc = doc(firestore, 'habits', habit.id);
      const currentDate = new Date().toISOString().split('T')[0];
      const newCompletedDates = [...habit.completedDates, currentDate];
      await updateDoc(habitDoc, {
        completedDates: newCompletedDates,
        lastCompletedDate: currentDate,
      });
      onHabitUpdated({ ...habit, completedDates: newCompletedDates, lastCompletedDate: currentDate });
    } catch (error) {
      console.error("Error marking habit as completed:", error);
    }
  };

  return (
    <div className="habit-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="input"
          />
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="input">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
          <button onClick={handleUpdateHabit} className="button">Save</button>
          <button onClick={() => setIsEditing(false)} className="button">Cancel</button>
        </>
      ) : (
        <>
          <h3>{habit.name}</h3>
          <p>Frequency: {habit.frequency}</p>
          <p>Completed Dates: {habit.completedDates.join(', ')}</p>
          <button onClick={handleMarkCompleted} className="button">Mark as Completed</button>
          <button onClick={() => setIsEditing(true)} className="button">Edit</button>
          <button onClick={handleDeleteHabit} className="button">Delete</button>
        </>
      )}
    </div>
  );
};

export default HabitCard;