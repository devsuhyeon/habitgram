import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';

import challengegroupImg from 'img/homepageImg/challengegroup.png';
import challengelistImg from 'img/homepageImg/challengelist.png';
import goalcardImg from 'img/homepageImg/goalcard.png';
import habitcardImg from 'img/homepageImg/habitcard.png';
import postcardImg from 'img/homepageImg/postcard.png';

const Home = () => {
  return (
    <div>
      <nav>
        <div>Habitgram</div>
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      </nav>
      <header>
        <div>
          <h2>Don't challenge alone, Change your life together</h2>
          <div>
            Share your goals and stay motivated. It won't be lonely journey
            anymore.
          </div>
          <button>
            <Link to="/signup">Get started</Link>
          </button>
        </div>
        <img src={postcardImg}></img>
      </header>
      <section>
        <h3>Recommend for these people</h3>
        <div>
          <FaRegSadTear />
          <h4>Those who set goals but give up whithin a few days</h4>
        </div>
        <div>
          <GiProgression />
          <h4>Those who want to see the progress of each month at a glance</h4>
        </div>
        <div>
          <FaUsers />
          <h4>Those who want to move forward with people with the same goal</h4>
        </div>
      </section>
      <article>
        <h3>Features</h3>
        <section>
          <img src={goalcardImg}></img>
          <div>
            <h4>Set your goal with self-reward</h4>
            <p>
              Setting goals is the first step in the journey, and self-reward
              helps you keep moving towards your goals.
            </p>
          </div>
        </section>
        <section>
          <div>
            <h4>Track your progress</h4>
            <p>
              You can see the progress of your habits at a glance with calendar
            </p>
          </div>
          <img src={habitcardImg}></img>
        </section>
        <section>
          <img src={challengelistImg}></img>
          <div>
            <h4>Participate in group challenge</h4>
            <p>
              Challenge with other users towards the same goal. Anything can be
              a challenge and you can even create new challenge.
            </p>
          </div>
        </section>
        <section>
          <div>
            <h4>Post a picture to complete the challenge of the day</h4>
            <p>
              pictures are not only proof that you performed the challenge of
              the day, but also record of your growth.
            </p>
          </div>
          <img src={challengegroupImg}></img>
        </section>
      </article>
      <footer>
        <div>Habitgram</div>
        <div>
          <div>Contact</div>
          <div>suhyeonlee.dev@gmail.com</div>
        </div>
        <div>Copyright 2022 Suhyeon Lee. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Home;
