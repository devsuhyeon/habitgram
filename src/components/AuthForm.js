import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from 'assets/styles/Login.module.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const AuthForm = ({ isNewAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setNewAccount(isNewAccount);
  }, [isNewAccount]);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      navigate('/goal');
    } catch (error) {
      let result;

      switch (error.code) {
        case 'auth/weak-password':
          result = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          result = 'Invalid email.';
          break;
        case 'auth/user-not-found':
          result = 'User not found.';
          break;
        case 'auth/wrong-password':
          result = 'Wrong password.';
          break;
        default:
          console.log(error.message);
      }
      setError(result);
    }
  };
  return (
    <div className={styles['auth-form-container']}>
      <Link className={styles['previous-btn']} to="/">
        <AiOutlineArrowLeft />
      </Link>
      <div className={styles.logo}>Habitgram</div>
      <span className={styles['form-type']}>
        {newAccount ? 'Sign Up' : 'Log In'}
      </span>
      <form className={styles['auth-form']} onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          name="email"
          type="text"
          required
          value={email}
          onChange={onChange}
        ></input>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          name="password"
          type="password"
          required
          value={password}
          onChange={onChange}
        ></input>
        <span className={styles.error}>{error}</span>
        <input
          className={`${styles.submit} ${
            newAccount ? styles.signup : styles.login
          } `}
          type="submit"
          value={newAccount ? 'Create Account' : 'Log In'}
        ></input>
      </form>
    </div>
  );
};

export default AuthForm;
