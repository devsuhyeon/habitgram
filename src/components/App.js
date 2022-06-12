import AppRouter from 'components/Router';
import { authService, dbService } from 'fbase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import 'assets/styles/App.css';
import 'assets/styles/fonts/fonts.css';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);

        // Get user data from database
        getUserFromDB(user).then((userDB) => {
          if (!userDB) {
            // New user
            addNewUserToDB(user);
            // Read DB agian to get DBid of new user
            getUserFromDB(user).then((newUserDB) => {
              settingUserObj(newUserDB);
            });
          } else {
            // Existing user
            settingUserObj(userDB);
          }
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const addNewUserToDB = async (user) => {
    try {
      const newUserObj = {
        displayName: user.displayName
          ? user.displayName
          : user.email.split('@')[0],
        uid: user.uid,
        participatingChallenges: [],
        userPosts: [],
      };
      // Add new user to database
      await addDoc(collection(dbService, 'user'), newUserObj);
    } catch (e) {
      console.error('Error adding userObj to user database: ', e);
    }
  };

  const settingUserObj = (userDB) => {
    setUserObj({
      DBid: userDB.id,
      displayName: userDB.displayName,
      uid: userDB.uid,
    });
  };

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

const getUserFromDB = async (user) => {
  let userDB;
  const q = query(collection(dbService, 'user'), where('uid', '==', user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userDB = { id: doc.id, ...doc.data() };
  });
  return userDB;
};

export default App;
export { getUserFromDB };
