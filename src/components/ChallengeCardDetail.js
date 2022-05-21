import CategoryImg from './CategoryImg';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { MdClose } from 'react-icons/md';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChallengeCardDetail = ({ userObj, challengeObj, onCardCloseClick }) => {
  const navigate = useNavigate();
  const challengeRef = doc(dbService, 'challenge', challengeObj.id);
  const userRef = doc(dbService, 'user', userObj.DBid);
  const onCardClose = () => {
    onCardCloseClick();
  };

  const onParticipateClick = async () => {
    const ok = window.confirm(
      `Do you want to participate in "${challengeObj.title}" challenge?`
    );
    if (ok) {
      // update the number of participants in challenge database
      await updateDoc(challengeRef, {
        participants: challengeObj.participants + 1,
      });

      // update participants list in challenge database
      await updateDoc(challengeRef, {
        participantsList: [userObj.uid, ...challengeObj.participantsList],
      });

      // update participating challenges in user database
      await updateDoc(userRef, {
        participatingChallenges: [
          challengeObj,
          ...userObj.participatingChallenges,
        ],
      });

      // update participating challenges in userObj
      userObj.participatingChallenges = [
        challengeObj,
        ...userObj.participatingChallenges,
      ];

      navigate(`/challenge/challengegroup/${challengeObj.id}`);
    }
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
      <button onClick={onParticipateClick}>Participate</button>
    </div>
  );
};

export default ChallengeCardDetail;
