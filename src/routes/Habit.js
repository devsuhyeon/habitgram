import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'fbase';
import { GrFormAdd } from 'react-icons/gr';
import HabitCard from 'components/HabitCard';
import styles from 'assets/styles/Habit.module.css';

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
    <div className="main-page">
      <h2>Habit</h2>
      <div className={styles['habit-cards']}>
        {creatingHabit ? (
          <div className={styles['new-habit']}>
            <form className={styles['new-habit-form']} onSubmit={onSubmit}>
              <label className={styles.title} htmlFor="habit-title">
                Habit Title
              </label>
              <input
                className={styles.input}
                name="habit-title"
                type="text"
                required
                onChange={onChange}
              />
              <input
                className={`${styles.btn} ${styles.submit}`}
                type="submit"
                value="Add"
              ></input>
              <button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={onCancelClick}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div className={styles['new-habit']}>
            <button className={styles['new-habit-btn']} onClick={onCreateHabit}>
              <GrFormAdd className={styles['add-icon']} /> New Habit
            </button>
          </div>
        )}
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default Habit;
