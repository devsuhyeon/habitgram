import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const GoalCard = ({ goalObj }) => {
  return (
    <div>
      <div>
        <button>
          <HiOutlinePencilAlt />
        </button>
        <button>
          <MdDelete />
        </button>
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
    </div>
  );
};

export default GoalCard;
