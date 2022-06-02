import CategoryImg from './CategoryImg';
import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import styles from 'assets/styles/ChallengeCard.module.css';

const ChallengeCard = ({ challengeObj, onCardClick }) => {
  const onCardOpen = () => {
    // Pass the clicked card obj
    onCardClick(challengeObj);
  };

  return (
    <div className={styles.card} onClick={onCardOpen}>
      <div className={styles['card-img']}>
        <CategoryImg challengeObj={challengeObj} usage={'card'} />
      </div>
      <div className={styles['card-content']}>
        <div className={styles['card-info']}>
          <div className={styles['card-categories']}>
            <button className={styles['card-category']}>
              {challengeObj.category}
            </button>
            <button className={styles['card-category']}>
              {challengeObj.frequency}
            </button>
            <button className={styles['card-category']}>
              {challengeObj.days}
            </button>
          </div>
          <span className={styles['card-title']}>{challengeObj.title}</span>
        </div>
        <button className={styles['card-right-icon']}>
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
