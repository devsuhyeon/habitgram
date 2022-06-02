import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import styles from 'assets/styles/ReportForm.module.css';

const ReportForm = ({ userObj, post, onReportCancel, onReportSubmit }) => {
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReason(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const reportObj = {
      post,
      reason,
      reportedAt: new Date().toLocaleDateString(),
      reporterId: userObj.uid,
    };

    try {
      // Write report to database
      await addDoc(collection(dbService, 'report'), reportObj);
    } catch (e) {
      console.error('Error adding reportObj to report database: ', e);
    }

    // Close the report form after 2 seconds
    setSubmitted(true);
    setTimeout(() => {
      onReportSubmit();
    }, 2000);
  };
  return (
    <div className={styles['report-form-container']}>
      {submitted ? (
        <div className={styles['report-form-message']}>
          A report has been received. Thank you
        </div>
      ) : (
        <>
          <span className={styles['report-form-title']}>
            Please provide a reason for reporting this post
          </span>
          <form className={styles['report-form']} onSubmit={onSubmit}>
            <label htmlFor="reason">Reason</label>
            <textarea className={styles.input} onChange={onChange} />
            <div className={styles.btns}>
              <button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={onReportCancel}
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
        </>
      )}
    </div>
  );
};

export default ReportForm;
