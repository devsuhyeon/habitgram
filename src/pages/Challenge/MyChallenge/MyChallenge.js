import ChallengeCard from 'pages/Challenge/ChallengeCard';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import styles from 'styles/MyChallenge.module.css';
import { getUserFromDB } from 'App';

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
      const startDate = new Date(userChallenge.startDate);
      const endDate = new Date(userChallenge.endDate);
      const today = new Date();
      if (endDate < today) {
        past.push(userChallenge);
      } else if (startDate > today) {
        scheduled.push(userChallenge);
      } else {
        participating.push(userChallenge);
      }
    });

  const onCardClick = (challengeObj) => {
    navigate(`/challenge/challengegroup/${challengeObj.id}`);
  };

  const getDaysLeft = (userChallenge) => {
    const startDate = new Date(userChallenge.startDate);
    const today = new Date();
    const diffDate = startDate.getTime() - today.getTime();
    const daysLeft = Math.floor(diffDate / (1000 * 3600 * 24));
    const hoursLeft = Math.floor(diffDate / (1000 * 3600));
    if (daysLeft === 0) {
      return hoursLeft + ' hours';
    } else {
      return 'D-' + daysLeft;
    }
  };

  return (
    <div className="main-page">
      <div className={styles['header-container']}>
        <Link to="/challenge" className={styles['previous-btn']}>
          <HiOutlineChevronLeft />
        </Link>
        <h2>{userObj.displayName}'s Challenge</h2>
      </div>
      <section className={styles['challenge-list']}>
        <div>
          <h3>In progress</h3>
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
                <div className={styles['days-left']}>
                  {getDaysLeft(userChallenge)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Past</h3>
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
      </section>
    </div>
  );
};

export default MyChallenge;
