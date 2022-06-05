import CategoryImg from './CategoryImg';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { MdClose } from 'react-icons/md';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'assets/styles/ChallengeCardDetail.module.css';

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

  const getFrequency = () => {
    switch (challengeObj.frequency) {
      case 'everyday':
        return 'every day';
      case 'five':
        return '5 times a week';
      case 'three':
        return '3 times a week';
      case 'twice':
        return 'twice a week';
      case 'once':
        return 'once a week';
      default:
    }
  };
  return (
    <div className={styles['card-detail']}>
      <button className={styles['card-detail-close']} onClick={onCardClose}>
        <MdClose />
      </button>
      <div className={styles['card-detail-img']}>
        <CategoryImg challengeObj={challengeObj} usage={'detail'} />
      </div>
      <div className={styles['card-detail-content']}>
        <div className={styles['title-category']}>
          <span className={styles['title']}>{challengeObj.title}</span>
          <div className={styles['categories']}>
            <span className={styles['category']}>{challengeObj.category}</span>
            <span className={styles['category']}>{challengeObj.days} days</span>
            <span className={styles['category']}>{getFrequency()}</span>
          </div>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-name']}>Creator</span>
          <span className={styles['item-value']}>
            {challengeObj.displayName}
          </span>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-name']}>Start date</span>
          <span className={styles['item-value']}>{challengeObj.startDate}</span>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-name']}>End date</span>
          <span className={styles['item-value']}>{challengeObj.endDate}</span>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-name']}>Frequency</span>
          <span className={styles['item-value']}>{getFrequency()}</span>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-name']}>
            Current number of participants
          </span>
          <span className={styles['item-value']}>
            {challengeObj.participants}
          </span>
        </div>
        <div className={styles['item']}>
          <span className={styles['item-name']}>Challenge description</span>
          <span className={styles['item-value']}>
            {challengeObj.description}
          </span>
        </div>
      </div>
      <button
        className={styles['participate-btn']}
        onClick={onParticipateClick}
      >
        Participate
      </button>
    </div>
  );
};

export default ChallengeCardDetail;
