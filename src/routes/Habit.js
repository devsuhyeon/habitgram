import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'fbase';
import { GrFormAdd } from 'react-icons/gr';
import HabitCard from 'components/HabitCard';

const Habit = ({ userObj }) => {
  const [creatingHabit, setCreatingHabit] = useState(false);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // Get habits from database
    getHabitsFromDB().then((habitList) => {
      setHabits(habitList);
    });
  }, [creatingHabit]);

  const getHabitsFromDB = async () => {
    let habitArr = [];
    const q = query(
      collection(dbService, 'habit'),
      where('creatorId', '==', userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      habitArr.push({ id: doc.id, ...doc.data() });
    });
    return habitArr;
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewHabitTitle(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newHabitObj = {
      title: newHabitTitle,
      creatorId: userObj.uid,
      selectedDateList: [],
    };
    try {
      // Write new habit obj to database
      await addDoc(collection(dbService, 'habit'), newHabitObj);
    } catch (e) {
      console.error('Error adding habit Obj to habit database: ', e);
    }
    setCreatingHabit(false);
  };

  const onCreateHabit = () => {
    setCreatingHabit(true);
  };

  const onCancelClick = (event) => {
    event.preventDefault();
    setCreatingHabit(false);
  };

  return (
    <div>
      <h2>Habit</h2>
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
      {creatingHabit ? (
        <form onSubmit={onSubmit}>
          <label htmlFor="habit-title">Habit Title</label>
          <input name="habit-title" type="text" required onChange={onChange} />
          <input type="submit" value="Add"></input>
          <button onClick={onCancelClick}>Cancel</button>
        </form>
      ) : (
        <button onClick={onCreateHabit}>
          <GrFormAdd /> New Habit
        </button>
      )}
    </div>
  );
};

export default Habit;
