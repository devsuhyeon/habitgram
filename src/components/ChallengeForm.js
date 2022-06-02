import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { dbService } from 'fbase';
import React, { useState } from 'react';
import styles from 'assets/styles/ChallengeForm.module.css';

const ChallengeForm = ({ userObj, onCreateCancelClick, onSubmitForm }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');
  const userRef = doc(dbService, 'user', userObj.DBid);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'category') {
      setCategory(value);
    } else if (name === 'start-date') {
      setStartDate(value);
    } else if (name === 'end-date') {
      setEndDate(value);
    } else if (name === 'frequency') {
      setFrequency(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const getDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffDate = endDate.getTime() - startDate.getTime();
    return diffDate / (1000 * 3600 * 24);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setDays(getDays(startDate, endDate));
    const challengeObj = {
      title,
      category,
      startDate,
      endDate,
      days,
      frequency,
      description,
      participants: 1,
      participantsList: [userObj.uid],
      createdAt: Date.now(),
      creatorId: userObj.uid,
      status: 'scheduled',
      challengePosts: [],
    };

    try {
      // Write challenge to database
      await addDoc(collection(dbService, 'challenge'), challengeObj);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    // Read challenge database to get challenge obj with challenge DBid
    let challengeObjFromDB;
    const q = query(
      collection(dbService, 'challenge'),
      where('createdAt', '==', challengeObj.createdAt)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      challengeObjFromDB = { id: doc.id, ...doc.data() };
    });

    // update participating challenges in user database
    await updateDoc(userRef, {
      participatingChallenges: [
        challengeObjFromDB,
        ...userObj.participatingChallenges,
      ],
    });

    // update participating challenges in userObj
    userObj.participatingChallenges = [
      challengeObjFromDB,
      ...userObj.participatingChallenges,
    ];

    setTitle('');
    setCategory('');
    setStartDate('');
    setEndDate('');
    setFrequency('');
    setDescription('');

    onSubmitForm();
  };
  return (
    <div className={styles['challenge-form-container']}>
      <div className={styles['challenge-form-title']}>
        What kind of challenge do you want to do with other users?
      </div>
      <form className={styles['challenge-form']} onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="title">
          Challenge title
        </label>
        <input
          className={styles.input}
          name="title"
          type="text"
          required
          value={title}
          onChange={onChange}
        ></input>
        <label className={styles.label} htmlFor="category">
          Category
        </label>
        <select
          className={styles.input}
          name="category"
          required
          value={category}
          onChange={onChange}
        >
          <option value={''}>Select category</option>
          <option value={'routine'}>Routine</option>
          <option value={'workout'}>Workout</option>
          <option value={'diet'}>Diet</option>
          <option value={'hobby'}>Hobby</option>
          <option value={'study'}>Study</option>
          <option value={'selfcare'}>Self-care</option>
          <option value={'others'}>Others</option>
        </select>
        <div className={styles.dates}>
          <div className={styles.date}>
            <label className={styles.label} htmlFor="startDate">
              Start date
            </label>
            <input
              className={styles.input}
              name="start-date"
              type="date"
              required
              value={startDate}
              onChange={onChange}
            ></input>
          </div>
          <div className={styles.date}>
            <label className={styles.label} htmlFor="end-date">
              End date
            </label>
            <input
              className={styles.input}
              name="end-date"
              type="date"
              required
              value={endDate}
              onChange={onChange}
            ></input>
          </div>
        </div>
        <label className={styles.label} htmlFor="frequency">
          Frequency
        </label>
        <select
          className={styles.input}
          name="frequency"
          required
          value={frequency}
          onChange={onChange}
        >
          <option value={''}>Select frequency</option>
          <option value={'everyday'}>Every day</option>
          <option value={'five'}>Five times a week</option>
          <option value={'three'}>Three times a week</option>
          <option value={'twice'}>Twice a week</option>
          <option value={'once'}>Once a week</option>
        </select>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          className={`${styles.input} ${styles['input-description']}`}
          name="description"
          required
          value={description}
          onChange={onChange}
        ></textarea>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.cancel}`}
            onClick={onCreateCancelClick}
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

export default ChallengeForm;
