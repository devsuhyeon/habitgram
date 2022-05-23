import GoalForm from 'components/GoalForm';
import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import GoalCard from 'components/GoalCard';

const Goal = ({ userObj }) => {
  const [goals, setGoals] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // Get goals from database
    const q = query(collection(dbService, 'goal'));
    onSnapshot(q, (snapshot) => {
      const goalArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(goalArr);
    });
  }, []);

  const onSetNewGoal = () => {
    setCreating(true);
  };

  const onCancelClick = (event) => {
    event.preventDefault();
    setCreating(false);
  };

  const onGoalSubmit = () => {
    setCreating(false);
  };

  return (
    <div>
      {creating && (
        <GoalForm
          userObj={userObj}
          onCancelClick={onCancelClick}
          onGoalSubmit={onGoalSubmit}
        />
      )}
      <div>
        <h2>Goals &amp; Rewards</h2>
        <h4>
          Set goals before you set out on your journey and share your goals with
          others.
        </h4>
        <h4>It helps you stay motivated and become accountable.</h4>
        <button onClick={onSetNewGoal}>Set a new goal</button>
      </div>
      <div>
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goalObj={goal}
            isOwner={goal.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Goal;
