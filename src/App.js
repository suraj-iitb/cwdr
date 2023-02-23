import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  AuthRoute,
  AddUser,
  FieldWorkerList,
  UserList,
  Statistics,
} from "./components";
import { SignIn, AdminPage, Home } from "./pages";
import { ROLES } from "./config";
import FieldWorkerRoot from "./components/FieldWorkerForms/FieldWorker.root";

export default function App() {
  return (
    <Routes>
      <Route exact path="/signin" element={<SignIn />} />

      <Route element={<AuthRoute allowedRoles={[ROLES.ADMIN, ROLES.FIELD]} />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/fieldWorkerForm" element={<FieldWorkerRoot />} />
      </Route>

      <Route element={<AuthRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route exact path="/admin" element={<AdminPage />}>
          <Route exact path="addFieldWorker" element={<AddUser />} />
          <Route exact path="getFieldWorker" element={<FieldWorkerList />} />
          <Route exact path="getUserData/:org" element={<UserList />} />
          <Route exact path="statistics" element={<Statistics />} />
        </Route>
      </Route>

      <Route exact path="/unauthorized" element={<>Unauthorized User!!!!</>} />
      <Route path="*" element={<>Not Implemented!!!!</>} />
    </Routes>
  );
}
