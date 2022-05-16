import React, { useState } from 'react';
import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { CgProfile } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const GoalCard = ({ goalObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goalObj.goal);
  const [newPlan, setNewPlan] = useState(goalObj.plan);
  const [newPeriod, setNewPeriod] = useState(goalObj.period);
  const [newReward, setNewReward] = useState(goalObj.reward);
  const goalRef = doc(dbService, 'goal', `${goalObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('Do you want to delete this goal?');
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
    <div>
      {/* If editing is true, the Edit Form is shown. Otherwise, the Goal Card is shown */}
      {editing ? (
        <>
          {/* Edit Form */}
          <div></div>
          <form onSubmit={onSubmit}>
            <div>
              <button onClick={toggleEditing}>Cancel</button>
              <input type="submit" value="Update" />
            </div>
            <label htmlFor="goal">Goal</label>
            <input
              name="goal"
              type="text"
              placeholder="Edit your goal"
              required
              value={newGoal}
              onChange={onChange}
            ></input>
            <label htmlFor="plan">Plan</label>
            <input
              name="plan"
              type="text"
              placeholder="Edit your plan"
              required
              value={newPlan}
              onChange={onChange}
            ></input>
            <label htmlFor="period">Period</label>
            <input
              name="period"
              type="text"
              placeholder="Edit your period"
              required
              value={newPeriod}
              onChange={onChange}
            ></input>
            <label htmlFor="reward">Self-reward</label>
            <input
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
          {/* Goal Card */}
          <div>
            {/* Goal can only be deleted and edited by creator */}
            {isOwner && (
              <>
                <button onClick={toggleEditing}>
                  <HiOutlinePencilAlt />
                </button>
                <button onClick={onDeleteClick}>
                  <MdDelete />
                </button>
              </>
            )}
          </div>
          <div>
            <div>
              <div>
                <CgProfile />
                <span>username</span>
              </div>
              <span>{new Date(goalObj.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span>
                <b>Goal</b>
                {goalObj.goal}
              </span>
              <span>
                <b>Plan</b>
                {goalObj.plan}
              </span>
              <span>
                <b>Period</b>
                {goalObj.period}
              </span>
              <span>
                <b>Self-reward</b>
                {goalObj.reward}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalCard;
