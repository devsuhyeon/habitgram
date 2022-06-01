import React, { useState } from 'react';
import Calendar from './Calendar';
import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const HabitCard = ({ habit }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(habit.title);
  // set selectedDateList with the selected dates stored in the database
  const [selectedDateList, setSelectedDateList] = useState(
    habit.selectedDateList
  );
  const habitCardRef = doc(dbService, 'habit', `${habit.id}`);
  const [monthCount, setMonthCount] = useState(0);

  const onEditCard = () => {
    setEditing(true);
  };

  const onDeleteCard = async () => {
    const ok = window.confirm('Are you sure you want to delete this habit?');
    if (ok) {
      // Delete habit card
      await deleteDoc(habitCardRef);
    }
  };

  const onCancelEdit = () => {
    setEditing(false);
    // When the modification is canceled, selectedDateList is reset to previous value.
    setSelectedDateList(habit.selectedDateList);
  };

  const onUpdateCard = async () => {
    // Update title and selectedDateList in database
    await updateDoc(habitCardRef, {
      title: newTitle,
      selectedDateList,
    });
    // Update selectedDateList saved in local
    habit.selectedDateList = selectedDateList;

    setEditing(false);
  };

  const onSelectDate = (addedDate) => {
    // Add selected date to selectedDateList
    setSelectedDateList([...selectedDateList, addedDate]);
  };

  const onSelectCancel = (deletedDate) => {
    // Delete selected date from selectedDateList
    const newDateArr = selectedDateList.filter((date) => date !== deletedDate);
    setSelectedDateList(newDateArr);
  };

  const onFormTextChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTitle(value);
  };

  const getMonthCount = (month, year) => {
    let currentMonthDates = [];

    selectedDateList.forEach((date) => {
      const splitedDate = date.split('/');
      // if date is 23/6/2022,
      // splitedDate[0] is 23
      // splitedDate[1] is 6
      // splitedDate[2] is 2022
      // If date has the same month and year as the current calendar, add it to the list.
      if (
        Number(splitedDate[1]) === month + 1 &&
        Number(splitedDate[2]) === year
      ) {
        currentMonthDates.push(date);
      }
    });
    setMonthCount(currentMonthDates.length);
  };

  return (
    <div>
      {editing ? (
        <div>
          <button onClick={onUpdateCard}>Update</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={onEditCard}>
            <HiOutlinePencilAlt />
          </button>
          <button onClick={onDeleteCard}>
            <MdDelete />
          </button>
        </div>
      )}
      <div>
        <div>
          {editing ? (
            <input
              type="text"
              value={newTitle}
              placeholder="Edit the habit title"
              required
              onChange={onFormTextChange}
            />
          ) : (
            <span>{habit.title}</span>
          )}
          <div>
            <div>
              <span>Current month count:</span>
              <span>{monthCount}</span>
            </div>
            <div>
              <span>Total count:</span>
              <span>{selectedDateList.length}</span>
            </div>
          </div>
        </div>
        <Calendar
          editing={editing}
          selectedDateList={selectedDateList}
          onSelectDate={onSelectDate}
          onSelectCancel={onSelectCancel}
          getMonthCount={getMonthCount}
        />
      </div>
    </div>
  );
};

export default HabitCard;
