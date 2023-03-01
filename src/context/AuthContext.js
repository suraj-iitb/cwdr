import React, { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, createUserProfileDocument, retrieveDoc } from "../firebase";

import { COLLECTIONS, ROLES } from '../constants/constants'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        const user = await retrieveDoc(COLLECTIONS.USER, userAuth.user.uid);
        if(user?.roles?.includes(ROLES.ADMIN)) {
          navigate("/admin/addFieldWorker");
        } else {
          navigate('/fieldWorkerForm');
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
