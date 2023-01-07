import React, { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, createUserProfileDocument } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((userAuth) => {
      setCurrentUser(userAuth.user);
      localStorage.setItem("userAuth", JSON.stringify(userAuth.user));
      navigate("/home");
    });
  };

  const signOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        localStorage.removeItem("userAuth");
      })
      .finally(() => navigate("/"));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      setLoading(false);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, (snapshot) => {
          const user = {
            ...snapshot.data(),
            id: snapshot.id,
          };
          setCurrentUser(user);

          localStorage.setItem("userAuth", JSON.stringify(user));
        });
      } else {
        setCurrentUser(null);
        localStorage.removeItem("userAuth");
      }
    });
    return () => unsubscribe();
  }, []);

  const authValue = {
    currentUser,
    signInWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={authValue}>{!loading && children}</AuthContext.Provider>;
};
