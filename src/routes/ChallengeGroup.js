import { dbService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import Post from 'components/Post';
import PostForm from 'components/PostForm';
import React, { useEffect, useState } from 'react';

const ChallengeGroup = ({ userObj }) => {
  const { challengeId } = useParams();
  const [challengeObj, setChallengeObj] = useState();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getPostsFromDB();
  }, []);

  const getPostsFromDB = async () => {
    const q = query(collection(dbService, 'challenge'));
    onSnapshot(q, (snapshot) => {
      const challengeArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const challengeInfo = challengeArr.filter(
        (challenge) => challenge.id === challengeId
      );
      setChallengeObj(challengeInfo[0]);
    });
  };

  const onUploadPicture = (event) => {
    event.preventDefault();
    setUploading(true);
  };

  const onUploadCancel = (event) => {
    event.preventDefault();
    setUploading(false);
  };

  return (
    <>
      {challengeObj && (
        <div>
          {uploading && (
            <PostForm
              challengeObj={challengeObj}
              userObj={userObj}
              onUploadCancel={onUploadCancel}
            />
          )}
          <div>
            <Link to={`/challenge/mychallenge/${userObj.uid}`}>
              <HiOutlineChevronLeft />
            </Link>
            <h2>{challengeObj.title}</h2>
          </div>
          <div>
            <div>
              <div>
                <span>Period</span>
                <span>
                  {challengeObj.startDate} ~ {challengeObj.endDate} (
                  {challengeObj.days} days)
                </span>
              </div>
              <div>
                <span>Frequency</span>
                <span>{challengeObj.frequency}</span>
              </div>
              <div>
                <span>Number of participants</span>
                <span>{challengeObj.participants}</span>
              </div>
            </div>
            <button onClick={onUploadPicture}>Upload picture</button>
          </div>
          <div>
            {challengeObj.challengePosts.map((post, index) => (
              <Post key={index} userObj={userObj} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengeGroup;
