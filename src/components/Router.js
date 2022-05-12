import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Habit from '../routes/Habit';
import Goal from '../routes/Goal';
import Challenge from '../routes/Challenge';
import History from '../routes/History';
import Home from '../routes/Home';
import Login from '../routes/Login';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Habit />} />
            <Route exact path="/goal" element={<Goal />} />
            <Route exact path="/challenge" element={<Challenge />} />
            <Route exact path="/history" element={<History />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
