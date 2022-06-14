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
      if (challengeStatus === 'inProgress') {
        participating.push(userChallenge);
      } else if (challengeStatus === 'scheduled') {
        scheduled.push(userChallenge);
      } else if (challengeStatus === 'finished') {
        past.push(userChallenge);
      }
    });

  const onCardClick = (challengeObj) => {
    if (challengeObj.status === 'scheduled') {
      return;
    }
    navigate(`/challenge/challengegroup/${challengeObj.id}`);
  };

  const onScheduledCardClick = () => {
    alert('This challenge has not started yet.');
  };

  const getDaysLeft = (userChallenge) => {
    const startDate = new Date(userChallenge.startDate);
    const today = new Date();
    const diffDate = startDate.getTime() - today.getTime();
    return Math.floor(diffDate / (1000 * 3600 * 24));
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
          <h3>In progress</h3>
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
              onClick={onScheduledCardClick}
            >
              <ChallengeCard
                challengeObj={userChallenge}
                onCardClick={onCardClick}
              />
              <div className={styles['days-left']}>
                D-{getDaysLeft(userChallenge)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Finished</h3>
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
