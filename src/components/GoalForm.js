import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

const GoalForm = ({ userObj }) => {
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
  const onSubmit = async (event) => {
    event.preventDefault();
    const goalObj = {
      goal,
      plan,
      period,
      reward,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
  };
  const onCancelClick = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <h3>What goal do you want to achieve?</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="goal">Goal</label>
        <input
          name="goal"
          type="text"
          placeholder=""
          required
          value={goal}
          onChange={onChange}
        ></input>
        <label htmlFor="plan">Plan</label>
        <input
          name="plan"
          type="text"
          placeholder=""
          required
          value={plan}
          onChange={onChange}
        ></input>
        <label htmlFor="period">Period</label>
        <input
          name="period"
          type="text"
          placeholder=""
          required
          value={period}
          onChange={onChange}
        ></input>
        <label htmlFor="reward">Self-reward</label>
        <input
          name="reward"
          type="text"
          placeholder=""
          required
          value={reward}
          onChange={onChange}
        ></input>
        <button onClick={onCancelClick}>Cancel</button>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default GoalForm;
