import { dbService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import Post from 'pages/Challenge/ChallengeGroup/Post';
import PostForm from 'pages/Challenge/ChallengeGroup/PostForm';
import React, { useEffect, useState } from 'react';
import styles from 'styles/ChallengeGroup.module.css';
import Modal from 'components/Modal';
import { FaUserCircle } from 'react-icons/fa';

export const getChallengeObjFromDB = async (challengeId, setChallengeObj) => {
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

const ChallengeGroup = ({ userObj }) => {
  const { challengeId } = useParams();
  const [challengeObj, setChallengeObj] = useState();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getChallengeObjFromDB(challengeId, setChallengeObj);
  }, []);

  const onUploadPicture = (event) => {
    event.preventDefault();

    if (challengeObj.status === 'scheduled') {
      alert('This challenge has not started yet.');
      return;
    }

    if (challengeObj.status === 'finished') {
      alert('This challenge has ended.');
      return;
    }

    let isUploaded = false;

    const participantObj = challengeObj.participantsList.filter(
      (participant) => participant.id === userObj.uid
    )[0];

    //Check if there are any posts posted today
    participantObj.uploadDates.map((uploadDate) => {
      if (
        new Date(uploadDate).toLocaleDateString() ===
        new Date().toLocaleDateString()
      ) {
        isUploaded = true;
        alert('Post can only be uploaded once per day.');
        return;
      }
    });
    !isUploaded && setUploading(true);
  };

  const onUploadCancel = (event) => {
    event.preventDefault();
    setUploading(false);
  };

  const onPostSubmit = () => {
    setUploading(false);
  };

  return (
    <div className="main-page">
      {challengeObj && (
        <div className={styles['page-container']}>
          {uploading && (
            <Modal onCancelClick={onUploadCancel}>
              <PostForm
                challengeObj={challengeObj}
                userObj={userObj}
                onUploadCancel={onUploadCancel}
                onPostSubmit={onPostSubmit}
              />
            </Modal>
          )}
          <div className={styles['header-container']}>
            <Link
              to={`/challenge/mychallenge/${userObj.uid}`}
              className={styles['previous-btn']}
            >
              <HiOutlineChevronLeft />
            </Link>
            <h2>{challengeObj.title}</h2>
          </div>
          <div className={styles['challenge-info']}>
            <div>
              <div className={styles['item']}>
                <span className={styles['item-title']}>Period</span>
                <span className={styles['item-value']}>
                  {challengeObj.startDate} ~ {challengeObj.endDate} (
                  {challengeObj.days} days)
                </span>
              </div>
              <div className={styles['item']}>
                <span className={styles['item-title']}>Frequency</span>
                <span className={styles['item-value']}>
                  {challengeObj.frequency}
                </span>
              </div>
              <div className={styles['item']}>
                <span className={styles['item-title']}>
                  Number of participants
                </span>
                <span className={styles['item-value']}>
                  {challengeObj.participants}
                </span>
              </div>
            </div>
            <button className={styles['upload-btn']} onClick={onUploadPicture}>
              Upload picture
            </button>
          </div>
          <div className={styles.progress}>
            {challengeObj.participantsList.map((participant) => (
              <div key={participant.id} className={styles.user}>
                <FaUserCircle className={styles.icon} />
                <div className={styles.displayName}>
                  {participant.displayName}
                </div>
                <div className={styles.achievement}>
                  {participant.achievement}%
                </div>
              </div>
            ))}
          </div>
          <div className={styles['posts-container']}>
            <div className={styles.posts}>
              {challengeObj.challengePosts.map((post, index) => (
                <Post
                  key={index}
                  userObj={userObj}
                  post={post}
                  challengeObj={challengeObj}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeGroup;
