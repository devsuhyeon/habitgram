import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'fbase';
import { BiPlus } from 'react-icons/bi';
import HabitCard from 'components/HabitCard';
import styles from 'assets/styles/Habit.module.css';
import HabitForm from 'components/HabitForm';
import Modal from 'components/Modal';

const Habit = ({ userObj }) => {
  const [creatingHabit, setCreatingHabit] = useState(false);
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

  const onCreateHabit = () => {
    setCreatingHabit(true);
  };

  const onCancelClick = (event) => {
    event.preventDefault();
    setCreatingHabit(false);
  };

  const onSubmitForm = () => {
    setCreatingHabit(false);
  };

  return (
    <div className="main-page">
      <h2>Habit</h2>
      <div className={styles['habit-cards']}>
        <div className={styles['new-habit']}>
          <button className={styles['new-habit-btn']} onClick={onCreateHabit}>
            <BiPlus className={styles['add-icon']} /> New Habit
          </button>
          {creatingHabit && (
            <Modal onCancelClick={onCancelClick}>
              <HabitForm
                userObj={userObj}
                onSubmitForm={onSubmitForm}
                onCancelClick={onCancelClick}
              />
            </Modal>
          )}
        </div>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default Habit;
