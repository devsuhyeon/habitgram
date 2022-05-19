import CategoryImg from './CategoryImg';
import React from 'react';
import { MdClose } from 'react-icons/md';

const ChallengeCardDetail = ({ challengeObj, onCardCloseClick }) => {
  const onCardClose = () => {
    onCardCloseClick();
  };
  return (
    <div>
      <button onClick={onCardClose}>
        <MdClose />
      </button>
      <div>
        <CategoryImg challengeObj={challengeObj} />
      </div>
      <div>
        <span>{challengeObj.title}</span>
        <span>{challengeObj.category}</span>
      </div>
      <div>
        <span>Creator</span>
        <span>{challengeObj.creatorId}</span>
      </div>
      <div>
        <span>Start date</span>
        <span>{challengeObj.startDate}</span>
      </div>
      <div>
        <span>End date</span>
        <span>{challengeObj.endDate}</span>
      </div>
      <div>
        <span>Frequency</span>
        <span>{challengeObj.frequency}</span>
      </div>
      <div>
        <span>Current number of participants</span>
        <span>{challengeObj.participants}</span>
      </div>
      <div>
        <span>Challenge description</span>
        <span>{challengeObj.description}</span>
      </div>
      <input type="submit" value="Participate" />
    </div>
  );
};

export default ChallengeCardDetail;
