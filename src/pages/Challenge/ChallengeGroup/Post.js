import { dbService, storageService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ReportForm from 'pages/Challenge/ChallengeGroup/ReportForm';
import styles from 'styles/Post.module.css';
import Modal from 'components/Modal';
import { getUserFromDB } from 'App';

const Post = ({ userObj, post, challengeObj }) => {
  const [reporting, setReporting] = useState(false);
  const challengeRef = doc(dbService, 'challenge', challengeObj.id);
  const userRef = doc(dbService, 'user', userObj.DBid);
  const urlRef = ref(storageService, post.previewUrl);
  const isOwner = post.creatorId === userObj.uid;
  const [userDB, setUserDB] = useState();

  useEffect(() => {
    getUserFromDB(userObj).then((result) => {
      setUserDB(result);
    });
  }, []);

  const onReportClick = () => {
    setReporting(true);
  };

  const onReportCancel = (event) => {
    event.preventDefault();
    setReporting(false);
  };

  const onReportSubmit = () => {
    setReporting(false);
  };

  const onPostDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this post?');
    if (ok) {
      // Delete this post from challenge database
      const newChallengePosts = deletePostFromDB(challengeObj.challengePosts);
      await updateDoc(challengeRef, {
        challengePosts: newChallengePosts,
      });

      // Delete this post from user database
      const newUserPosts = deletePostFromDB(userDB.userPosts);
      await updateDoc(userRef, {
        userPosts: newUserPosts,
      });

      // Delete picture from storage
      await deleteObject(urlRef);

      // Delete post uploaded date from participantObj.
      // Posts are limited to upload only once a day, but if a user deletes a post,
      // the post uploaded date also need to be deleted so that the user can re-upload the post.
      const participantsList = challengeObj.participantsList;
      const participantObj = participantsList.filter(
        (participant) => participant.id === userObj.uid
      )[0];
      const newParticipantObj = { ...participantObj };
      newParticipantObj.uploadDates = newParticipantObj.uploadDates.filter(
        (uploadDate) => uploadDate !== post.createdAt
      );

      // Replace existing participant obj to updated participant obj
      participantsList.splice(
        participantsList.indexOf(participantObj),
        1,
        newParticipantObj
      );

      await updateDoc(challengeRef, {
        participantsList: [...participantsList],
      });
    }
  };

  const deletePostFromDB = (postList) => {
    const newPostList = postList.filter(
      (postToBeDeleted) => postToBeDeleted.postId !== post.postId
    );
    return newPostList;
  };

  return (
    <div className={styles.post}>
      <div className={styles['post-header']}>
        <FaUserCircle className={styles['profile-icon']} />
        <div className={styles['username-date']}>
          <span className={styles['username']}>{post.displayName}</span>
          <span className={styles['date']}>
            {new Date(post.createdAt).toLocaleString('en-GB')}
            {/* day-month-year format */}
          </span>
        </div>
      </div>
      <img className={styles.picture} src={post.previewUrl} alt="picture" />
      <span className={styles.comment}>{post.comment}</span>
      <div className={styles.btns}>
        <button className={styles['report-btn']} onClick={onReportClick}>
          Report
        </button>
        {/* Delete button is only visible for post creator */}
        {isOwner && (
          <button className={styles['delete-btn']} onClick={onPostDelete}>
            <MdDelete />
          </button>
        )}
      </div>
      {reporting && (
        <Modal onCancelClick={onReportCancel}>
          <ReportForm
            userObj={userObj}
            post={post}
            onReportCancel={onReportCancel}
            onReportSubmit={onReportSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default Post;
