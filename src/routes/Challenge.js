import ChallengeCard from 'components/ChallengeCard';
import ChallengeCardDetail from 'components/ChallengeCardDetail';
import ChallengeForm from 'components/ChallengeForm';
import { dbService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Challenge = ({ userObj }) => {
  const [creating, setCreating] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [openedCard, setOpenedCard] = useState('');
  useEffect(() => {
    // Get challenges from database
    const q = query(collection(dbService, 'challenge'));
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

  const onCardClick = (challengeObj) => {
    // Get clicked challenge obj from challengeCard.js and set it to openedCard
    setOpenedCard(challengeObj);
  };

  const onCardCloseClick = () => {
    // Make openedCard empty when the card is closed
    setOpenedCard('');
  };

  return (
    <div>
      {/* If creating is true, the Challenge Form is shown */}
      {creating && (
        <ChallengeForm
          userObj={userObj}
          onCreateCancelClick={onCreateCancelClick}
        />
      )}
      <div>
        <h2>Challenge</h2>
        <button>
          <Link to={`/challenge/mychallenge/${userObj.uid}`}>
            My Challenge <HiOutlineChevronRight />
          </Link>
        </button>
      </div>
      <div>
        <h3>Challenge List</h3>
        <button onClick={onCreateClick}>Create a challenge</button>
      </div>
      <div>
        <button>All</button>
        <button>Routine</button>
        <button>Workout</button>
        <button>Diet</button>
        <button>Hobby</button>
        <button>Study</button>
        <button>Self-care</button>
        <button>Others</button>
      </div>
      <div>
        {challenges.map((challenge) => (
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
            challengeObj={openedCard}
            onCardCloseClick={onCardCloseClick}
          />
        )}
      </div>
    </div>
  );
};

export default Challenge;
