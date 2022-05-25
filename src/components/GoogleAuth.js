import React from 'react';
import { authService } from 'fbase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const onGoogleAuth = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
    navigate('/goal');
  };
  return (
    <button name="google" onClick={onGoogleAuth}>
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default GoogleAuth;
