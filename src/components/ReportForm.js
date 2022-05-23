import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

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
    <div>
      {submitted ? (
        <span>A report has been received</span>
      ) : (
        <>
          <span>Please provide a reason for reporting this post</span>
          <form onSubmit={onSubmit}>
            <label htmlFor="reason">Reason</label>
            <textarea onChange={onChange} />
            <div>
              <button onClick={onReportCancel}>Cancel</button>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ReportForm;
