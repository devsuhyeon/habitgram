import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';

import challengegroupImg from 'assets/img/homepageImg/challengegroup.png';
import challengelistImg from 'assets/img/homepageImg/challengelist.png';
import goalcardImg from 'assets/img/homepageImg/goalcard.png';
import habitcardImg from 'assets/img/homepageImg/habitcard.png';
import postImg from 'assets/img/homepageImg/post.png';
import styles from 'styles/Home.module.css';

const Home = () => {
  const [scrollY, setScrollY] = useState();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY);
    });
  }, []);

  return (
    <div className={styles['page-container']}>
      <div className={styles.homepage}>
        <div
          className={`${styles['nav-container']} ${
            scrollY > 0 && styles.active
          }`}
        >
          <nav className={styles.nav}>
            <div
              className={styles.logo}
              onClick={() => {
                window.location.replace('/');
              }}
            >
              Habitgram
            </div>
            <div>
              <Link to="/signup" className={`${styles.link} ${styles.signup}`}>
                Sign Up
              </Link>
              <Link to="/login" className={styles.link}>
                Log In
              </Link>
            </div>
          </nav>
        </div>
        <header className={styles.header}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Don't challenge alone, <br /> Change your life together
            </h1>
            <div className={styles.description}>
              Share your goals and stay motivated. It won't be lonely journey
              anymore.
            </div>
            <Link to="/signup" className={styles['get-started']}>
              Get started
            </Link>
          </div>
          <img src={postImg} alt="postImg"></img>
        </header>
        <section className={styles.recommend}>
          <h2 className={styles.title}>Recommend for these people</h2>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles['icon-container']}>
                <FaRegSadTear className={styles.icon} />
              </div>
              <span className={styles.description}>
                Those who set goals but give up whithin a few days
              </span>
            </div>
            <div className={styles.item}>
              <div className={styles['icon-container']}>
                <GiProgression className={styles.icon} />
              </div>
              <span className={styles.description}>
                Those who want to see the progress of each month at a glance
              </span>
            </div>
            <div className={styles.item}>
              <div className={styles['icon-container']}>
                <FaUsers className={styles.icon} />
              </div>
              <span className={styles.description}>
                Those who want to move forward with people with the same goal
              </span>
            </div>
          </div>
        </section>
        <article className={styles.features}>
          <h2 className={styles.title}>Features</h2>
          <section className={`${styles.feature} ${styles.goal}`}>
            <img src={goalcardImg} alt="goalcardImg"></img>
            <div className={styles.content}>
              <h3 className={styles['feature-title']}>
                Set your goal with self-reward
              </h3>
              <p className={styles['feature-description']}>
                Setting goals is the first step in the journey, and self-reward
                helps you keep moving towards your goals.
              </p>
            </div>
          </section>
          <section className={`${styles.feature} ${styles.progress}`}>
            <div className={styles.content}>
              <h3 className={styles['feature-title']}>Track your progress</h3>
              <p className={styles['feature-description']}>
                You can see the progress of your habits at a glance with
                calendar
              </p>
            </div>
            <img src={habitcardImg} alt="habitcardImg"></img>
          </section>
          <section className={`${styles.feature} ${styles.challenge}`}>
            <img src={challengelistImg} alt="challengelistImg"></img>
            <div className={styles.content}>
              <h3 className={styles['feature-title']}>
                Participate in group challenge
              </h3>
              <p className={styles['feature-description']}>
                Challenge with other users towards the same goal. Anything can
                be a challenge and you can even create new challenge.
              </p>
            </div>
          </section>
          <section className={`${styles.feature} ${styles.post}`}>
            <div className={styles.content}>
              <h3 className={styles['feature-title']}>
                Post a picture to complete the challenge of the day
              </h3>
              <p className={styles['feature-description']}>
                Pictures are not only proof that you performed the challenge of
                the day, but also record of your growth.
              </p>
            </div>
            <img src={challengegroupImg} alt="challengegroupImg"></img>
          </section>
        </article>
        <footer className={styles.footer}>
          <div className={styles['logo-contact']}>
            <div
              className={styles.logo}
              onClick={() => {
                window.location.replace('/');
              }}
            >
              Habitgram
            </div>
            <div className={styles['contact-container']}>
              <div className={styles.contact}>Contact</div>
              <div className={styles.email}>suhyeonlee.dev@gmail.com</div>
            </div>
          </div>
          <div className={styles.copyright}>
            Copyright 2022 Suhyeon Lee. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
