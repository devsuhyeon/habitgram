import { FaUserCircle } from 'react-icons/fa';
import Post from 'components/Post';
import React, { useEffect, useState } from 'react';
import GoalCard from 'components/GoalCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'fbase';
import styles from 'assets/styles/MyPage.module.css';

const MyPage = ({ userObj }) => {
  const [content, setContent] = useState('goals');
  const [goals, setGoals] = useState([]);
  const challenges = userObj.participatingChallenges;

  useEffect(() => {
    getGoalsFromDB().then((goalDB) => {
      setGoals(goalDB);
    });
  }, []);

  const getGoalsFromDB = async () => {
    let goalDB = [];
    const q = query(
      collection(dbService, 'goal'),
      where('creatorId', '==', userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      goalDB.push({ id: doc.id, ...doc.data() });
    });
    return goalDB;
  };

  const getChallengeObj = (post) => {
    const challengeObj = challenges.filter(
      (challenge) => challenge.id === post.challengeId
    );
    return challengeObj[0];
  };

  const onMenuClick = (event) => {
    const {
      target: { value },
    } = event;
    if (value === 'goals') {
      setContent('goals');
    } else if (value === 'feed') {
      setContent('feed');
    }
  };

  return (
    <div className="main-page">
      <h2>My page</h2>
      <div className={styles.profile}>
        <FaUserCircle className={styles['profile-icon']} />
        <span className={styles['profile-username']}>
          {userObj.displayName}
        </span>
      </div>
      <div className={styles.nav}>
        <div className={styles['nav-menu-container']}>
          <button
            className={`${styles['nav-menu']} ${
              content === 'goals' && styles.active
            }`}
            onClick={onMenuClick}
            value="goals"
          >
            Goals &amp; Rewards
          </button>
          <button
            className={`${styles['nav-menu']} ${
              content === 'feed' && styles.active
            }`}
            onClick={onMenuClick}
            value="feed"
          >
            Challenge Feed
          </button>
        </div>
        <div
          className={`${styles['active-bar']} ${
            content === 'goals' && styles.goals
          } ${content === 'feed' && styles.feed}`}
        ></div>
      </div>
      {content === 'goals' && (
        <div className={styles.goals}>
          {goals.map((goal) => (
            <GoalCard key={goal.id} goalObj={goal} isOwner={true} />
          ))}
        </div>
      )}
      {content === 'feed' && (
        <div className={styles.feed}>
          {userObj.userPosts.map((post, index) => (
            <Post
              key={index}
              userObj={userObj}
              post={post}
              challengeObj={getChallengeObj(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
