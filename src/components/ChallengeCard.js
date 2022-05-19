import CategoryImg from './CategoryImg';
import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

const ChallengeCard = ({ challengeObj, onCardClick }) => {
  const onCardOpen = () => {
    // Pass the clicked card obj to challenge.js
    onCardClick(challengeObj);
  };

  return (
    <div onClick={onCardOpen}>
      <div>
        <CategoryImg challengeObj={challengeObj} />
      </div>
      <div>
        <button>{challengeObj.category}</button>
        <button>{challengeObj.frequency}</button>
        <button>{challengeObj.days}</button>
      </div>
      <div>
        <span>{challengeObj.title}</span>
        <button>
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
