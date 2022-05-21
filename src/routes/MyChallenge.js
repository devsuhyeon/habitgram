import ChallengeCard from 'components/ChallengeCard';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const MyChallenge = ({ userObj }) => {
  const navigate = useNavigate();
  const userChallenges = userObj.participatingChallenges;
  let participating = [];
  let scheduled = [];
  let past = [];

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
    <div>
      <div>
        <Link to="/challenge">
          <HiOutlineChevronLeft />
        </Link>
        <h2>{userObj.displayName}'s Challenge</h2>
      </div>
      <div>
        <div>
          <span>Currently participating in</span>
        </div>
        <div>
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
        <span>Opening soon</span>
        <div>
          {scheduled.map((userChallenge) => (
            <ChallengeCard
              key={userChallenge.id}
              challengeObj={userChallenge}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>
      <div>
        <span>Past challenges</span>
        <div>
          {past.map((userChallenge) => (
            <ChallengeCard
              key={userChallenge.id}
              challengeObj={userChallenge}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChallenge;
