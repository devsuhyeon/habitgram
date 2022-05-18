import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
const ChallengeForm = ({ userObj, onCreateCancelClick }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');

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
      createdAt: Date.now(),
      creatorId: userObj.uid,
      status: 'scheduled',
    };

    try {
      // Write challenge to database
      await addDoc(collection(dbService, 'challenge'), challengeObj);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setTitle('');
    setCategory('');
    setStartDate('');
    setEndDate('');
    setFrequency('');
    setDescription('');
  };
  return (
    <div>
      <h3>What kind of challenge do you want to do with other users?</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Challenge title</label>
        <input
          name="title"
          type="text"
          required
          value={title}
          onChange={onChange}
        ></input>
        <label htmlFor="category">Category</label>
        <select name="category" required value={category} onChange={onChange}>
          <option value={''}>Select category</option>
          <option value={'routine'}>Routine</option>
          <option value={'workout'}>Workout</option>
          <option value={'diet'}>Diet</option>
          <option value={'hobby'}>Hobby</option>
          <option value={'study'}>Study</option>
          <option value={'selfcare'}>Self-care</option>
          <option value={'others'}>Others</option>
        </select>
        <label htmlFor="startDate">Start date</label>
        <input
          name="start-date"
          type="date"
          required
          value={startDate}
          onChange={onChange}
        ></input>
        <label htmlFor="end-date">End date</label>
        <input
          name="end-date"
          type="date"
          required
          value={endDate}
          onChange={onChange}
        ></input>
        <label htmlFor="frequency">Frequency</label>
        <select name="frequency" required value={frequency} onChange={onChange}>
          <option value={''}>Select frequency</option>
          <option value={'everyday'}>Every day</option>
          <option value={'five'}>Five times a week</option>
          <option value={'three'}>Three times a week</option>
          <option value={'twice'}>Twice a week</option>
          <option value={'once'}>Once a week</option>
        </select>
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="textarea"
          required
          value={description}
          onChange={onChange}
        ></input>
        <button onClick={onCreateCancelClick}>Cancel</button>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ChallengeForm;
