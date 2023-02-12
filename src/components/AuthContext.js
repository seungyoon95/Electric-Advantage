import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { getUserByUserId } from "../api/UserAPI";
import { getDealershipByUserID } from "../api/DealershipAPI";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState();
  const [searchedUser, setSearchedUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [userObject, setUserObject] = useState("");
  const [dealerObjectId, setDealerObjectId] = useState("");

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setUserType(null);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function GetUserType(id) {
    if (id === null) {
      setUserType("CUSTOMER");
    } else {
      let resultUser = await getUserByUserId(id);
      let statusCode = resultUser.status;
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
        setUserType(body.UserTypeID);
      }
    }
  }

  async function GetUserObject(id) {
    if (id === null) {
      setUserObject(null);
    } else {
      let resultUser = await getUserByUserId(id);
      let statusCode = resultUser.status;
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
        setUserObject(body);
      }
    }
  }

  async function GetDealerObjectId(id) {
    let resultUser = await getDealershipByUserID(id);
    let statusCode = resultUser.status;
    if (statusCode === 404) {
      setDealerObjectId(null);
    } else {
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
        console.log("dealerobject");
        console.log(body);
        setDealerObjectId(body.DealershipID);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        GetDealerObjectId(user.uid);
        GetUserType(user.uid);
        GetUserObject(user.uid);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    userType,
    userObject,
    dealerObjectId,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
