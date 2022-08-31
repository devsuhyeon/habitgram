import React, { useEffect, useState } from 'react';
import styles from 'styles/Calendar.module.css';

const CalendarDate = ({
  year,
  month,
  date,
  selectedDateList,
  onSelectDate,
  onSelectCancel,
  calendarColor,
}) => {
  const [selected, setSelected] = useState(false);
  const selectedDate = `${date}/${month + 1}/${year}`;

  useEffect(() => {
    // When moving to another month, the previous selection is reset.
    setSelected(false);

    // If selectedDate is in selectedDateList, 'selected' is true and its color changes.
    if (selectedDateList && selectedDateList.includes(selectedDate)) {
      setSelected(true);
    }
  }, [month, date, selectedDateList]);

  const toggleSelect = () => {
    if (selected) {
      setSelected(false);
      onSelectCancel(selectedDate);
    } else {
      setSelected(true);
      onSelectDate(selectedDate);
    }
  };

  return (
    <>
      {date ? (
        <div
          className={`${styles.date} ${
            selected && `${styles.selected} ${styles[calendarColor]}`
          }`}
          onClick={toggleSelect}
        >
          {date}
        </div>
      ) : (
        <div className={`${styles.date} ${styles['date-empty']}`}></div>
      )}
    </>
  );
};

export default CalendarDate;
