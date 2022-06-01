import React, { useEffect, useState } from 'react';
import CalendarDate from './CalendarDate';
import { BiChevronLeft } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';
import styles from 'assets/styles/Calendar.module.css';

const Calendar = ({
  editing,
  selectedDateList,
  onSelectDate,
  onSelectCancel,
  getMonthCount,
}) => {
  const [currentCalendar, setCurrentCalendar] = useState(new Date());
  const [year, setYear] = useState(currentCalendar.getFullYear());
  const [month, setMonth] = useState(currentCalendar.getMonth());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setYear(currentCalendar.getFullYear());
    setMonth(currentCalendar.getMonth());
    buildCalendar();
    getMonthCount(month, year);
  }, [currentCalendar, year, month, selectedDateList]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const onPrevClick = () => {
    const prevCalendar = new Date(year, month - 1);
    setCurrentCalendar(prevCalendar);
  };

  const onNextClick = () => {
    const nextCalendar = new Date(year, month + 1);
    setCurrentCalendar(nextCalendar);
  };

  const buildCalendar = () => {
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthDates = [];

    // Add dates of the month to the list
    for (let i = 0; i < lastDate; i++) {
      monthDates.push(i + 1);
    }

    // fill in the blanks for the days of the previous month
    monthDates.unshift(...new Array(firstDay));
    setDates(monthDates);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles['nav']}>
        <button className={styles['nav-btn']} onClick={onPrevClick}>
          <BiChevronLeft />
        </button>
        <span className={styles['nav-month']}>
          {months[month]} {year}
        </span>
        <button className={styles['nav-btn']} onClick={onNextClick}>
          <BiChevronRight />
        </button>
      </div>
      <div className={styles.days}>
        <div className={styles.day}>S</div>
        <div className={styles.day}>M</div>
        <div className={styles.day}>T</div>
        <div className={styles.day}>W</div>
        <div className={styles.day}>T</div>
        <div className={styles.day}>F</div>
        <div className={styles.day}>S</div>
      </div>
      <div
        className={`${styles.dates} ${editing ? '' : styles['non-editing']}`}
      >
        {dates.map((date, index) => (
          <CalendarDate
            key={index}
            year={year}
            month={month}
            date={date}
            selectedDateList={selectedDateList}
            onSelectDate={onSelectDate}
            onSelectCancel={onSelectCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
