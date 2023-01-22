import React from "react";
import { Route, Routes } from "react-router-dom";

import { UnauthenticatedRoutes, AuthenticatedRoutes, AddUser, EnhancedTable, DownloadData } from "./components";
import { SignIn, AdminPage, Home } from "./pages";

export default function App() {
  return (
      <Routes>

        <Route exact path="/" element={<Home />} />

        <Route element={<UnauthenticatedRoutes />}>
          <Route exact path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<AuthenticatedRoutes />}>
          <Route exact path="/admin" element={<AdminPage />} >
            <Route exact path="addUser" element={<AddUser />} />
            <Route exact path="getUser" element={<EnhancedTable />} />
            <Route exact path="downloadData" element={<DownloadData />} />
          </Route>
        </Route>

        <Route path="*" element={<>ERROR!!!!</>} />
      </Routes>
  );
};
