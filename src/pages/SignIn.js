import React, { useState } from "react";
import "./SignIn.scss";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signInWithEmail } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loading) {
      setLoading(true);
    }

    await signInWithEmail(email, password);
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const comp  = currentUser ? (
    navigate("/")
  ) : (
    <>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
    <Header />
    <div className="login-page">
      <div className="avatar">
        <img
          src="https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_960_720.png"
          alt="Avatar"
        />
      </div>
      <div className="form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button>Log in</button>
        </form>
        <p className="message">
          Forgot your password? <a href="#">Click here to reset it</a>
        </p>
      </div>
    </div>
    </Box>
    </>

  );

  return comp;
};
