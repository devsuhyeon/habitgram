import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Habit from 'pages/Habit/Habit';
import Goal from 'pages/Goal/Goal';
import Challenge from 'pages/Challenge/Challenge';
import ChallengeGroup from 'pages/Challenge/ChallengeGroup/ChallengeGroup';
import MyPage from 'pages/MyPage/MyPage';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import MyChallenge from 'pages/Challenge/MyChallenge/MyChallenge';
import Signup from 'pages/Login/Signup';
import SideNav from './SideNav';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <SideNav userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/habit" element={<Habit userObj={userObj} />} />
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
              path="/challenge/challengegroup/:challengeId"
              element={<ChallengeGroup userObj={userObj} />}
            />
            <Route
              exact
              path="/mypage"
              element={<MyPage userObj={userObj} />}
            />
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
