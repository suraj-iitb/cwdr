import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from '../src/App'
import Form1 from './page/Form1';
import SignIn from './page/SignIn'; 
import SignUp from './page/SignUp';
import { selectLogin } from '../src/app/redux';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MyRouter() {
  const login = useSelector(selectLogin);

  const router = createBrowserRouter([
    {
      path: "/home",
      element: login === "true" ? <App /> : 
      <Navigate to="/login" />,
    },
    {
      path: "/form",
      element: login === "true" ? <Form1 /> : 
      <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}
