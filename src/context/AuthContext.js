import React, { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

import { auth, createUserProfileDocument, retrieveDoc } from "../firebase";

import { COLLECTIONS, ROLES } from '../constants/constants'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(false);
      if (user) {
        setSessionStorageForUser(user);
      } else {
        removeSessionStorageForUser();
      }
    });
    return () => unsubscribe();
  }, []);

  const setSessionStorageForUser = async (user) => {
    const userRef = await createUserProfileDocument(user);
    onSnapshot(userRef, (snapshot) => {
      const currUser = {
        ...snapshot.data(),
        id: snapshot.id,
      };
      setCurrentUser(currUser);
      sessionStorage.setItem("user", JSON.stringify(currUser));
    });
  };

  const removeSessionStorageForUser = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("user");
  };

  const signInWithEmail = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (userAuth) => {
        await setSessionStorageForUser(userAuth.user, setCurrentUser);
        const origin = location.state?.from?.pathname + location.state?.from?.search;
        if(location.state != null) {
          navigate(origin);
        }
      }
    );
  };
  const _signOut = () => {
    signOut(auth)
      .then(() => {
        removeSessionStorageForUser();
      })
      .finally(() => navigate("/signin"));
  };

  const authValue = {
    currentUser,
    signInWithEmail,
    _signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
