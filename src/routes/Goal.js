import GoalForm from 'components/GoalForm';
import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import GoalCard from 'components/GoalCard';
import styles from 'assets/styles/Goal.module.css';
import Modal from 'components/Modal';

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
    <div className="main-page">
      {creating && (
        <Modal onCancelClick={onCancelClick}>
          <GoalForm
            userObj={userObj}
            onCancelClick={onCancelClick}
            onGoalSubmit={onGoalSubmit}
          />
        </Modal>
      )}
      <div className={styles['page-content-container']}>
        <div>
          <h2 className={styles['page-title']}>Goal &amp; Reward</h2>
          <h4 className={styles['page-description']}>
            Set goals before you set out on your journey and share your goals
            with others. <br />
            It helps you stay motivated and become accountable.
          </h4>
        </div>
        <button className={styles['add-goal-btn']} onClick={onSetNewGoal}>
          Set a new goal
        </button>
        <div className={styles['cards-container']}>
          <div className={styles.cards}>
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goalObj={goal}
                isOwner={goal.creatorId === userObj.uid}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;
