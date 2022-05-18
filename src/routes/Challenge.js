import ChallengeCard from 'components/ChallengeCard';
import ChallengeForm from 'components/ChallengeForm';
import { dbService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

const Challenge = ({ userObj }) => {
  const [creating, setCreating] = useState(false);
  const [challenges, setChallenges] = useState([]);
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
  }, []);

  const onCreateClick = (event) => {
    event.preventDefault();
    setCreating(true);
  };
  const onCreateCancelClick = (event) => {
    event.preventDefault();
    setCreating(false);
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
          My Challenge <HiOutlineChevronRight />
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
          <ChallengeCard key={challenge.id} challengeObj={challenge} />
        ))}
      </div>
    </div>
  );
};

export default Challenge;
