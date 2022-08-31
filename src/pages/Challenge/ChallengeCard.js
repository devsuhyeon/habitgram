import CategoryImg from './CategoryImg';
import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import styles from 'styles/ChallengeCard.module.css';

const ChallengeCard = ({ challengeObj, onCardClick }) => {
  const onCardOpen = () => {
    // Pass the clicked card obj
    onCardClick(challengeObj);
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
    <div className={styles.card} onClick={onCardOpen}>
      <div className={styles['card-img']}>
        <CategoryImg challengeObj={challengeObj} usage={'card'} />
      </div>
      <div className={styles['card-content']}>
        <div className={styles['card-categories']}>
          <button className={styles['card-category']}>
            {challengeObj.category}
          </button>
          <button className={styles['card-category']}>
            {challengeObj.days} days
          </button>
          <button className={styles['card-category']}>{getFrequency()}</button>
        </div>
        <span className={styles['card-title']}>{challengeObj.title}</span>
        <button className={styles['card-right-icon']}>
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
