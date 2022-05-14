import React, { useEffect, useState } from 'react';
import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logo from 'img/logo.png';
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
      navigate('/habit');
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
      console.log(error.message);
    }
  };
  return (
    <div>
      <Link to="/">
        <AiOutlineArrowLeft />
      </Link>
      <img src={logo} alt="logo" style={{ width: '300px' }} />
      <span>{newAccount ? 'Sign Up' : 'Log In'}</span>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          required
          value={email}
          onChange={onChange}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          required
          value={password}
          onChange={onChange}
        ></input>
        <span>{error}</span>
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Log In'}
        ></input>
      </form>
    </div>
  );
};

export default AuthForm;
