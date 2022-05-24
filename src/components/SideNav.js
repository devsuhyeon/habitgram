import React from 'react';
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import logo from 'img/logo.png';
import { BsCalendarWeek } from 'react-icons/bs';
import { IoPeopleOutline } from 'react-icons/io5';
import { FiTarget } from 'react-icons/fi';
import { GrHistory } from 'react-icons/gr';
import { BiUserCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

const SideNav = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService).then(() => {
      navigate('/');
    });
  };
  return (
    <nav>
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <Link to="/habit">
            <span>
              <BsCalendarWeek />
            </span>
            <span>HABITS</span>
          </Link>
        </li>
        <li>
          <Link to="/goal">
            <span>
              <FiTarget />
            </span>
            <span>GOALS &amp; REWARDS</span>
          </Link>
        </li>
        <li>
          <Link to="/challenge">
            <span>
              <IoPeopleOutline />
            </span>
            <span>CHALLENGE</span>
          </Link>
        </li>
        <li>
          <Link to="/mypage">
            <span>
              <GrHistory />
            </span>
            <span>MY PAGE</span>
          </Link>
        </li>
      </ul>
      <div>
        <span>
          <BiUserCircle />
        </span>
        <span>username</span>
        <button title="Log Out" onClick={onLogOutClick}>
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
