import React, { useState } from 'react';
import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { FaUserCircle } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import styles from 'assets/styles/GoalCard.module.css';

const GoalCard = ({ goalObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goalObj.goal);
  const [newPlan, setNewPlan] = useState(goalObj.plan);
  const [newPeriod, setNewPeriod] = useState(goalObj.period);
  const [newReward, setNewReward] = useState(goalObj.reward);
  const goalRef = doc(dbService, 'goal', `${goalObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this goal?');
    if (ok) {
      // Delete goal
      await deleteDoc(goalRef);
    }
  };
  const toggleEditing = (event) => {
    event.preventDefault();
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'goal') {
      setNewGoal(value);
    } else if (name === 'plan') {
      setNewPlan(value);
    } else if (name === 'period') {
      setNewPeriod(value);
    } else if (name === 'reward') {
      setNewReward(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // Edit goal
    await updateDoc(goalRef, {
      goal: newGoal,
      plan: newPlan,
      period: newPeriod,
      reward: newReward,
    });

    setEditing(false);
  };

  return (
    <div className={styles.card}>
      {/* Goal Card */}
      <div className={`${styles['card-index']} ${styles[goalObj.indexColor]}`}>
        {/* Goal can only be deleted and edited by creator */}
        {/* Edit button and delete button are invisible while editing */}
        {isOwner && !editing && isOwner && (
          <>
            <button className={styles['card-icon']} onClick={toggleEditing}>
              <HiOutlinePencilAlt className={styles['card-edit']} />
            </button>
            <button className={styles['card-icon']} onClick={onDeleteClick}>
              <MdDelete className={styles['card-delete']} />
            </button>
          </>
        )}
      </div>
      <div className={styles['card-info']}>
        {/* If editing is true, the Edit Form is shown. Otherwise, the Card Content is shown */}
        {editing ? (
          <>
            {/* Edit Form */}
            <form className={styles['edit-form']} onSubmit={onSubmit}>
              <div className={styles['edit-form-btns']}>
                <button
                  className={`${styles['edit-form-btn']} ${styles['edit-form-cancel']}`}
                  onClick={toggleEditing}
                >
                  Cancel
                </button>
                <input
                  className={`${styles['edit-form-btn']} ${styles['edit-form-update']}`}
                  type="submit"
                  value="Update"
                />
              </div>
              <label className={styles['edit-form-label']} htmlFor="goal">
                Goal
              </label>
              <input
                className={styles['edit-form-input']}
                name="goal"
                type="text"
                placeholder="Edit your goal"
                required
                value={newGoal}
                onChange={onChange}
              ></input>
              <label className={styles['edit-form-label']} htmlFor="plan">
                Plan
              </label>
              <input
                className={styles['edit-form-input']}
                name="plan"
                type="text"
                placeholder="Edit your plan"
                required
                value={newPlan}
                onChange={onChange}
              ></input>
              <label className={styles['edit-form-label']} htmlFor="period">
                Period
              </label>
              <input
                className={styles['edit-form-input']}
                name="period"
                type="text"
                placeholder="Edit your period"
                required
                value={newPeriod}
                onChange={onChange}
              ></input>
              <label className={styles['edit-form-label']} htmlFor="reward">
                Self-reward
              </label>
              <input
                className={styles['edit-form-input']}
                name="reward"
                type="text"
                placeholder="Edit your reward"
                required
                value={newReward}
                onChange={onChange}
              ></input>
            </form>
          </>
        ) : (
          <>
            {/* Card Content */}
            <div className={styles['card-header']}>
              <div className={styles['card-profile']}>
                <FaUserCircle className={styles['profile-icon']} />
                <span className={styles['profile-username']}>username</span>
              </div>
              <span className={styles['card-date']}>
                {new Date(goalObj.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={styles['card-content']}>
              <span className={styles['card-content-label']}>Goal</span>
              <span className={styles['card-content-value']}>
                {goalObj.goal}
              </span>

              <span className={styles['card-content-label']}>Plan</span>
              <span className={styles['card-content-value']}>
                {goalObj.plan}
              </span>

              <span className={styles['card-content-label']}>Period</span>
              <span className={styles['card-content-value']}>
                {goalObj.period}
              </span>

              <span className={styles['card-content-label']}>Self-reward</span>
              <span className={styles['card-content-value']}>
                {goalObj.reward}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalCard;
