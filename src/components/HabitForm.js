import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { dbService } from 'fbase';

import styles from 'assets/styles/HabitForm.module.css';

const HabitForm = ({ userObj, onSubmitForm, onCancelClick }) => {
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [color, setColor] = useState('yellow');

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewHabitTitle(value);
  };

  const onColorChange = (event) => {
    const clickedColor = event.target.getAttribute('value');
    setColor(clickedColor);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newHabitObj = {
      title: newHabitTitle,
      creatorId: userObj.uid,
      selectedDateList: [],
      calendarColor: color,
    };
    try {
      // Write new habit obj to database
      await addDoc(collection(dbService, 'habit'), newHabitObj);
    } catch (e) {
      console.error('Error adding habit Obj to habit database: ', e);
    }
    onSubmitForm();
  };

  return (
    <div className={styles['new-habit']}>
      <form className={styles['new-habit-form']} onSubmit={onSubmit}>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.cancel}`}
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <input
            className={`${styles.btn} ${styles.submit}`}
            type="submit"
            value="Add"
          ></input>
        </div>

        <label className={styles.label} htmlFor="habit-title">
          Habit Title
        </label>
        <input
          className={styles.input}
          name="habit-title"
          type="text"
          required
          onChange={onChange}
        />
        <label className={styles.label}>Goal card color</label>
        <div className={styles.colors}>
          <div
            className={`${styles.color} ${styles.yellow} ${
              color === 'yellow' && styles.active
            }`}
            value="yellow"
            onClick={onColorChange}
          ></div>
          <div
            className={`${styles.color} ${styles.turquoise} ${
              color === 'turquoise' && styles.active
            }`}
            value="turquoise"
            onClick={onColorChange}
          ></div>
          <div
            className={`${styles.color} ${styles.blue} ${
              color === 'blue' && styles.active
            }`}
            value="blue"
            onClick={onColorChange}
          ></div>
          <div
            className={`${styles.color} ${styles.green} ${
              color === 'green' && styles.active
            }`}
            value="green"
            onClick={onColorChange}
          ></div>
          <div
            className={`${styles.color} ${styles.purple} ${
              color === 'purple' && styles.active
            }`}
            value="purple"
            onClick={onColorChange}
          ></div>
          <div
            className={`${styles.color} ${styles.pink} ${
              color === 'pink' && styles.active
            }`}
            value="pink"
            onClick={onColorChange}
          ></div>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
