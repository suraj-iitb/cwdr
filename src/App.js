import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  AuthenticatedRoute,
  AddFieldWorker,
  ListFieldWorker,
  ListOrg,
  Statistics,
  FieldWorkerForm,
} from "./components";
import { SignIn, Admin, Home } from "./pages";
import { ROLES } from "./constants/constants";

export default function App() {
  return (
    <Routes>
      <Route exact path="/signin" element={<SignIn />} />

      <Route element={<AuthenticatedRoute allowedRoles={[ROLES.ADMIN, ROLES.FIELD]} />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/fieldWorkerForm" element={<FieldWorkerForm />} />
      </Route>

      <Route element={<AuthenticatedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route exact path="/admin" element={<Admin />}>
          <Route exact path="addFieldWorker" element={<AddFieldWorker action="add" />} />
          <Route exact path="getFieldWorker" element={<ListFieldWorker />} />
          <Route exact path="getUserData/:org" element={<ListOrg />} />
          <Route exact path="statistics" element={<Statistics />} />
        </Route>
      </Route>

      <Route exact path="/unauthorized" element={<>Unauthorized User!!!!</>} />
      <Route path="*" element={<>Not Implemented!!!!</>} />
    </Routes>
  );
}
