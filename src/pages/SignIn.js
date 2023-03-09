import React, { useState } from "react";
import "./SignIn.scss";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import Box from "@mui/material/Box";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signInWithEmail } = useAuth();
  const [isRevealPwd, setIsRevealPwd] = useState(false);

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

  const comp = currentUser ? (
    navigate("/")
  ) : (
    <>
      <div className="container">
        <CssBaseline />
        <Header />
        <div className="login-page contentBody">
          <div className="form">
            <h2>Login</h2>
            <form>
            <Box mb={2}>
              <TextField
                label="Username"
                variant="outlined" 
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                sx={{width: '100%'}}
              />
           </Box>
           <Box mb={2}>
              <TextField
                label="Password"
                variant="outlined" 
                type={isRevealPwd ? "text" : "password"}
                name="pass"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setIsRevealPwd(!isRevealPwd)}>
                        {isRevealPwd ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{width: '100%'}}
                onChange={(e) => setPassword(e.target.value)}
              />
              </Box>

              <button className="loginButton" onClick={handleSubmit}>Log in</button>
            </form>
            <p className="message">
              Forgot your password? <a href="#">Click here to reset it</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return comp;
};
