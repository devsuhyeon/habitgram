import { dbService, storageService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import ReportForm from './ReportForm';

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
    <div>
      <div>
        <div>
          <CgProfile />
          <div>
            <span>{post.displayName}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <button onClick={onPostDelete}>
          <MdDelete />
        </button>
      </div>
      <img src={post.previewUrl} alt="picture" />
      <span>{post.comment}</span>
      <button onClick={onReportClick}>Report</button>
      {reporting && (
        <ReportForm
          userObj={userObj}
          post={post}
          onReportCancel={onReportCancel}
          onReportSubmit={onReportSubmit}
        />
      )}
    </div>
  );
};

export default Post;
