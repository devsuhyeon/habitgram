import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import styles from 'assets/styles/Goal.module.css';

const GoalForm = ({ userObj, onCancelClick, onGoalSubmit }) => {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState('');
  const [period, setPeriod] = useState('');
  const [reward, setReward] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'goal') {
      setGoal(value);
    } else if (name === 'plan') {
      setPlan(value);
    } else if (name === 'period') {
      setPeriod(value);
    } else if (name === 'reward') {
      setReward(value);
    }
  };
  const getRandomColor = () => {
    // get random color for goal card index
    const colors = ['purple', 'pink', 'yellow', 'green', 'blue'];
    const randomNumber = Math.floor(Math.random() * colors.length);
    console.log(randomNumber);
    return colors[randomNumber];
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const goalObj = {
      goal,
      plan,
      period,
      reward,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      indexColor: getRandomColor(),
    };

    try {
      // Write goal to database
      await addDoc(collection(dbService, 'goal'), goalObj);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setGoal('');
    setPlan('');
    setPeriod('');
    setReward('');

    onGoalSubmit();
  };

  return (
    <div className={styles['goal-form-container']}>
      <div className={styles['goal-form-title']}>
        What goal do you want to achieve?
      </div>
      <form className={styles['goal-form']} onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="goal">
          Goal
        </label>
        <input
          className={styles.input}
          name="goal"
          type="text"
          placeholder=""
          required
          value={goal}
          onChange={onChange}
        ></input>
        <label className={styles.label} htmlFor="plan">
          Plan
        </label>
        <input
          className={styles.input}
          name="plan"
          type="text"
          placeholder=""
          required
          value={plan}
          onChange={onChange}
        ></input>
        <label className={styles.label} htmlFor="period">
          Period
        </label>
        <input
          className={styles.input}
          name="period"
          type="text"
          placeholder=""
          required
          value={period}
          onChange={onChange}
        ></input>
        <label className={styles.label} htmlFor="reward">
          Self-reward
        </label>
        <input
          className={styles.input}
          name="reward"
          type="text"
          placeholder=""
          required
          value={reward}
          onChange={onChange}
        ></input>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.cancel}`}
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <input
            className={`${styles.btn} ${styles.submit}`}
            type="submit"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
