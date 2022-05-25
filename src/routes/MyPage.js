import { BiUserCircle } from 'react-icons/bi';
import Post from 'components/Post';
import React, { useEffect, useState } from 'react';
import GoalCard from 'components/GoalCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'fbase';

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
    <div>
      <h2>My page</h2>
      <div>
        <BiUserCircle />
        <span>{userObj.displayName}</span>
      </div>
      <div>
        <button onClick={onMenuClick} value="goals">
          Goals &amp; Rewards
        </button>
        <button onClick={onMenuClick} value="feed">
          Challenge Feed
        </button>
      </div>
      {content === 'goals' && (
        <div>
          {goals.map((goal) => (
            <GoalCard key={goal.id} goalObj={goal} isOwner={true} />
          ))}
        </div>
      )}
      {content === 'feed' && (
        <div>
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
