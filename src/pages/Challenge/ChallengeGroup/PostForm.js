import { dbService, storageService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from 'styles/PostForm.module.css';
import { getUserFromDB } from 'App';

const PostForm = ({ challengeObj, userObj, onUploadCancel, onPostSubmit }) => {
  const fileInput = useRef();
  const [preview, setPreview] = useState('');
  const [comment, setComment] = useState('');
  const challengeRef = doc(dbService, 'challenge', challengeObj.id);
  const userRef = doc(dbService, 'user', userObj.DBid);
  const [userDB, setUserDB] = useState();

  useEffect(() => {
    getUserFromDB(userObj).then((result) => {
      setUserDB(result);
    });
  }, []);

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPreview(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onCommentChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  const convertFrequencyToNum = () => {
    switch (challengeObj.frequency) {
      case 'everyday':
        return 7;
      case 'five':
        return 5;
      case 'three':
        return 3;
      case 'twice':
        return 2;
      case 'once':
        return 1;
      default:
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let previewUrl = '';
    const previewRef = ref(storageService, `${challengeObj.id}/${uuidv4()}`);
    const response = await uploadString(previewRef, preview, 'data_url');
    previewUrl = await getDownloadURL(response.ref);

    const newPost = {
      postId: uuidv4(),
      creatorId: userObj.uid,
      displayName: userObj.displayName,
      challengeId: challengeObj.id,
      previewUrl,
      comment,
      createdAt: Date.now(),
    };

    // Update challenge posts in challenge database
    await updateDoc(challengeRef, {
      challengePosts: [newPost, ...challengeObj.challengePosts],
    });

    // Update user posts in user database
    await updateDoc(userRef, {
      userPosts: [newPost, ...userDB.userPosts],
    });

    // Update post uploaded date and achievement rate
    const participantsList = challengeObj.participantsList;
    const participantObj = participantsList.filter(
      (participant) => participant.id === userObj.uid
    )[0];
    const newParticipantObj = { ...participantObj };
    // Update post uploaded date
    newParticipantObj.uploadDates = [
      newPost.createdAt,
      ...newParticipantObj.uploadDates,
    ];
    // Update achievement rate
    // achievement = number of posts / (frequency * weeks) * 100
    newParticipantObj.achievement = Math.floor(
      (newParticipantObj.uploadDates.length /
        (convertFrequencyToNum() * (challengeObj.days / 7))) *
        100
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

    setPreview('');
    setComment('');

    onPostSubmit();
  };

  const onClearPicture = (event) => {
    event.preventDefault();
    setPreview(null);
    fileInput.current.value = '';
  };

  return (
    <div className={styles['post-form-container']}>
      <div className={styles['post-form-title']}>
        Complete today's challenge with picture !
      </div>
      <form className={styles['post-form']} onSubmit={onSubmit}>
        <label htmlFor="picture">Choose a picture:</label>
        <input
          className={styles.file}
          name="picture"
          type="file"
          accept="image/*"
          required
          onChange={onFileChange}
          ref={fileInput}
        />
        <div className={styles['preview-container']}>
          {preview ? (
            <img className={styles['preview-img']} src={preview} />
          ) : (
            <div className={styles['preview-text']}>Preview</div>
          )}
          <button className={styles['file-clear-btn']} onClick={onClearPicture}>
            Clear
          </button>
        </div>
        <label htmlFor="comment">Comment</label>
        <textarea
          className={styles.comment}
          name="comment"
          maxLength="100"
          onChange={onCommentChange}
        />
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.cancel}`}
            onClick={onUploadCancel}
          >
            Cancel
          </button>
          <input
            className={`${styles.btn} ${styles.submit}`}
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
