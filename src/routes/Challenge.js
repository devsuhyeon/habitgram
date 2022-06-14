import ChallengeCard from 'components/ChallengeCard';
import ChallengeCardDetail from 'components/ChallengeCardDetail';
import ChallengeForm from 'components/ChallengeForm';
import { dbService } from 'fbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styles from 'assets/styles/Challenge.module.css';
import Modal from 'components/Modal';

const Challenge = ({ userObj }) => {
  const [creating, setCreating] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [openedCard, setOpenedCard] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    // Get challenges from database
    const q = query(
      collection(dbService, 'challenge'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const challengeArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChallenges(challengeArr);
    });
  }, [openedCard]);

  const onCreateClick = (event) => {
    event.preventDefault();
    setCreating(true);
  };

  const onCreateCancelClick = (event) => {
    event.preventDefault();
    setCreating(false);
  };

  const onSubmitForm = () => {
    setCreating(false);
  };

  const onCardClick = (challengeObj) => {
    // Get clicked challenge obj from challengeCard.js and set it to openedCard
    setOpenedCard(challengeObj);
  };

  const onCardCloseClick = () => {
    // Make openedCard empty when the card is closed
    setOpenedCard('');
  };

  const onCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrentCategory(value);
  };

  const getCategorizedChallenges = () => {
    if (currentCategory === 'all') {
      return challenges;
    }
    const categorizedChallenges = challenges.filter(
      (challenge) => challenge.category === currentCategory
    );
    return categorizedChallenges;
  };

  return (
    <div className="main-page">
      {/* If creating is true, the Challenge Form is shown */}
      {creating && (
        <Modal onCancelClick={onCreateCancelClick}>
          <ChallengeForm
            userObj={userObj}
            onCreateCancelClick={onCreateCancelClick}
            onSubmitForm={onSubmitForm}
          />
        </Modal>
      )}
      <div className={styles.header}>
        <h2 className={styles['page-title']}>Challenge</h2>
        <button className={styles['my-challenge-btn']}>
          <Link
            to={`/challenge/mychallenge/${userObj.uid}`}
            className={styles['my-challenge-link']}
          >
            My Challenge
            <HiOutlineChevronRight className={styles['my-challenge-icon']} />
          </Link>
        </button>
      </div>
      <h3 className={styles['challenge-list']}>Challenge List</h3>
      <div className={styles['challenge-list-btns']}>
        <div className={styles.categories}>
          <button
            className={`${styles.category} ${
              currentCategory === 'all' && styles.active
            } `}
            value="all"
            onClick={onCategoryChange}
          >
            All
          </button>
          <button
            className={`${styles.category} ${
              currentCategory === 'routine' && styles.active
            } `}
            value="routine"
            onClick={onCategoryChange}
          >
            Routine
          </button>
          <button
            className={`${styles.category} ${
              currentCategory === 'workout' && styles.active
            } `}
            value="workout"
            onClick={onCategoryChange}
          >
            Workout
          </button>
          <button
            className={`${styles.category} ${
              currentCategory === 'diet' && styles.active
            } `}
            value="diet"
            onClick={onCategoryChange}
          >
            Diet
          </button>
          <button
            className={`${styles.category} ${
              currentCategory === 'hobby' && styles.active
            } `}
            value="hobby"
            onClick={onCategoryChange}
          >
            Hobby
          </button>
          <button
            className={`${styles.category} ${
              currentCategory === 'study' && styles.active
            } `}
            value="study"
            onClick={onCategoryChange}
          >
            Study
          </button>
          <button
            className={`${styles.category} ${
              currentCategory === 'selfcare' && styles.active
            } `}
            value="selfcare"
            onClick={onCategoryChange}
          >
            Self-care
          </button>
          <button
            className={`${styles.category} ${
              currentCategory === 'others' && styles.active
            } `}
            value="others"
            onClick={onCategoryChange}
          >
            Others
          </button>
        </div>
        <button
          className={styles['create-challenge-btn']}
          onClick={onCreateClick}
        >
          Create a challenge
        </button>
      </div>
      <div className={styles['cards-container']}>
        <div className={styles.cards}>
          {getCategorizedChallenges().map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challengeObj={challenge}
              onCardClick={onCardClick}
            />
          ))}
        </div>
        <div>
          {/* // Open card clicked */}
          {openedCard && (
            <ChallengeCardDetail
              userObj={userObj}
              challengeObj={openedCard}
              onCardCloseClick={onCardCloseClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenge;
