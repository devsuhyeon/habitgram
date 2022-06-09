import React from 'react';
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from 'assets/styles/SideNav.module.css';

// icons
import { BsCalendarWeek } from 'react-icons/bs';
import { FiTarget } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const SideNav = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService).then(() => {
      navigate('/');
    });
  };
  return (
    <nav className={styles['side-nav']}>
      <div className={styles.logo}>Habitgram</div>
      <ul className={styles.pages}>
        <li className={styles.page}>
          <NavLink
            to="/goal"
            className={({ isActive }) =>
              isActive
                ? `${styles['page-link']} ${styles['page-active']}`
                : styles['page-link']
            }
          >
            <FiTarget className={styles['page-icon']} />
            <span className={styles['page-title']}>GOAL &amp; REWARD</span>
          </NavLink>
        </li>
        <li className={styles.page}>
          <NavLink
            to="/habit"
            className={({ isActive }) =>
              isActive
                ? `${styles['page-link']} ${styles['page-active']}`
                : styles['page-link']
            }
          >
            <BsCalendarWeek className={styles['page-icon']} />
            <span className={styles['page-title']}>HABIT</span>
          </NavLink>
        </li>
        <li className={styles.page}>
          <NavLink
            to="/challenge"
            className={({ isActive }) =>
              isActive
                ? `${styles['page-link']} ${styles['page-active']}`
                : styles['page-link']
            }
          >
            <FiUsers className={styles['page-icon']} />
            <span className={styles['page-title']}>CHALLENGE</span>
          </NavLink>
        </li>
        <li className={styles.page}>
          <NavLink
            to="/mypage"
            className={({ isActive }) =>
              isActive
                ? `${styles['page-link']} ${styles['page-active']}`
                : styles['page-link']
            }
          >
            <FiUser className={styles['page-icon']} />
            <span className={styles['page-title']}>MY PAGE</span>
          </NavLink>
        </li>
      </ul>
      <div className={styles.footer}>
        <div className={styles['footer-profile']}>
          <FaUserCircle className={styles['profile-icon']} />
          <span className={styles['profile-displayName']}>
            {userObj && userObj.displayName}
          </span>
        </div>
        <button
          title="Log Out"
          onClick={onLogOutClick}
          className={styles['footer-logout']}
        >
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
