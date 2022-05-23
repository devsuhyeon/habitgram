import { dbService, storageService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PostForm = ({ challengeObj, userObj, onUploadCancel, onPostSubmit }) => {
  const fileInput = useRef();
  const [preview, setPreview] = useState('');
  const [comment, setComment] = useState('');
  const challengeRef = doc(dbService, 'challenge', challengeObj.id);
  const userRef = doc(dbService, 'user', userObj.DBid);

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
      userPosts: [newPost, ...userObj.userPosts],
    });

    // Update user posts in user obj
    userObj.userPosts = [newPost, ...userObj.userPosts];

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
    <div>
      <h3>Complete today's challenge with picture !</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="picture">Choose a picture:</label>
        <input
          name="picture"
          type="file"
          accept="image/*"
          required
          onChange={onFileChange}
          ref={fileInput}
        />
        <div>
          {preview ? (
            <img src={preview} width="100px" height="100px" />
          ) : (
            <span>Preview</span>
          )}
          <button onClick={onClearPicture}>Clear</button>
        </div>
        <label htmlFor="comment">Comment</label>
        <textarea name="comment" onChange={onCommentChange} />
        <div>
          <button onClick={onUploadCancel}>Cancel</button>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
