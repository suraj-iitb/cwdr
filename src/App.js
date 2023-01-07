import React from "react";
import { Route, Routes } from "react-router-dom";

import { UnauthenticatedRoutes, AuthenticatedRoutes } from "./components";
import { SignIn, LandingPage, Home } from "./pages";

export default function App() {
  return (
      <Routes>

        <Route exact path="/" element={<LandingPage />} />

        <Route element={<UnauthenticatedRoutes />}>
          <Route exact path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<AuthenticatedRoutes />}>
          <Route exact path="/home" element={<Home />} />
        </Route>

        <Route path="*" element={<>ERROR!!!!</>} />
      </Routes>
  );
};
