import React from 'react';
import styles from 'styles/Modal.module.css';

const Modal = ({ children, onCancelClick }) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-overlay']} onClick={onCancelClick}></div>
      <div className={styles['modal-content']}>{children}</div>
    </div>
  );
};

export default Modal;
