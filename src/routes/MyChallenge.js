import ChallengeCard from 'components/ChallengeCard';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import styles from 'assets/styles/MyChallenge.module.css';
import { getUserFromDB } from 'components/App';

const MyChallenge = ({ userObj }) => {
  const navigate = useNavigate();
  const [userChallenges, setUserChallenges] = useState(null);
  let participating = [];
  let scheduled = [];
  let past = [];

  useEffect(() => {
    getUserFromDB(userObj).then((userDB) => {
      setUserChallenges(userDB.participatingChallenges);
    });
  }, []);

  userChallenges &&
    userChallenges.forEach((userChallenge) => {
      const challengeStatus = userChallenge.status;
      if (challengeStatus === 'participating') {
        participating.push(userChallenge);
      } else if (challengeStatus === 'scheduled') {
        scheduled.push(userChallenge);
      } else if (challengeStatus === 'past') {
        past.push(userChallenge);
      }
    });

  const onCardClick = (challengeObj) => {
    navigate(`/challenge/challengegroup/${challengeObj.id}`);
  };

  return (
    <div className="main-page">
      <div className={styles['header-container']}>
        <Link to="/challenge" className={styles['previous-btn']}>
          <HiOutlineChevronLeft />
        </Link>
        <h2>{userObj.displayName}'s Challenge</h2>
      </div>
      <div>
        <div>
          <h3>Currently participating in</h3>
        </div>
        <div className={styles.cards}>
          {participating.map((userChallenge) => (
            <ChallengeCard
              key={userChallenge.id}
              challengeObj={userChallenge}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>
      <div>
        <h3>Opening soon</h3>
        <div className={styles.cards}>
          {scheduled.map((userChallenge) => (
            <div
              key={userChallenge.id}
              className={`${styles['card-container']} ${styles.scheduled}`}
            >
              <ChallengeCard
                challengeObj={userChallenge}
                onCardClick={onCardClick}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Past challenges</h3>
        <div className={styles.cards}>
          {past.map((userChallenge) => (
            <div
              key={userChallenge.id}
              className={`${styles['card-container']} ${styles.past}`}
            >
              <ChallengeCard
                challengeObj={userChallenge}
                onCardClick={onCardClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChallenge;
