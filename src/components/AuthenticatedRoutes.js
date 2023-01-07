import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../hooks";

export const AuthenticatedRoutes = () => {
  const { currentUser } = useAuth();
  
  return currentUser ? <Outlet /> : <Navigate to={"/signin"} />;
};
