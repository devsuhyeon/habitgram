import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Habit from 'routes/Habit';
import Goal from 'routes/Goal';
import Challenge from 'routes/Challenge';
import ChallengeGroup from 'routes/ChallengeGroup';
import History from 'routes/History';
import Home from 'routes/Home';
import Login from 'routes/Login';
import MyChallenge from 'routes/MyChallenge';
import Signup from 'routes/Signup';
import SideNav from './SideNav';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <SideNav />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/habit" element={<Habit />} />
            <Route exact path="/goal" element={<Goal userObj={userObj} />} />
            <Route
              exact
              path="/challenge"
              element={<Challenge userObj={userObj} />}
            />
            <Route
              exact
              path="/challenge/mychallenge/:uid"
              element={<MyChallenge userObj={userObj} />}
            />
            <Route
              exact
              path="/challenge/ChallengeGroup:challengeId"
              element={<ChallengeGroup />}
            />
            <Route exact path="/history" element={<History />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
