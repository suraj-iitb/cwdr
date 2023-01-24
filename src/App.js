import React from "react";
import { Route, Routes } from "react-router-dom";

import { UnauthenticatedRoutes, AuthenticatedRoutes, AddUser, FieldWorkerList, UserList } from "./components";
import { SignIn, AdminPage, Home } from "./pages";
import FieldWorkerForm from './pages/FieldWorkerForm'

export default function App() {
  return (
      <Routes>

        <Route exact path="/" element={<Home />} />

        <Route element={<UnauthenticatedRoutes />}>
          <Route exact path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<AuthenticatedRoutes />}>
          <Route exact path="/admin" element={<AdminPage />} >
            <Route exact path="addFieldWorker" element={<AddUser />} />
            <Route exact path="getFieldWorker" element={<FieldWorkerList />} />
            <Route exact path="getUserData/:org" element={<UserList />} />
          </Route>

          <Route exact path="/field_worker_form" element={<FieldWorkerForm />} />

        </Route>

        <Route path="*" element={<>Not Implemented!!!!</>} />
      </Routes>
  );
};
