import { dbService, storageService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ReportForm from './ReportForm';
import styles from 'assets/styles/Post.module.css';
import Modal from './Modal';

const Post = ({ userObj, post, challengeObj }) => {
  const [reporting, setReporting] = useState(false);
  const challengeRef = doc(dbService, 'challenge', challengeObj.id);
  const userRef = doc(dbService, 'user', userObj.DBid);
  const urlRef = ref(storageService, post.previewUrl);

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
      const newUserPosts = deletePostFromDB(userObj.userPosts);
      await updateDoc(userRef, {
        userPosts: newUserPosts,
      });

      // Delete this post from user obj
      userObj.userPosts = newUserPosts;

      // Delete picture from storage
      await deleteObject(urlRef);
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
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <img className={styles.picture} src={post.previewUrl} alt="picture" />
      <span className={styles.comment}>{post.comment}</span>
      <div className={styles.btns}>
        <button className={styles['report-btn']} onClick={onReportClick}>
          Report
        </button>
        <button className={styles['delete-btn']} onClick={onPostDelete}>
          <MdDelete />
        </button>
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
