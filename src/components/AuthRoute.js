import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks";

export const AuthRoute = ({ allowedRoles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  console.log(allowedRoles, currentUser);
  console.log(currentUser?.roles);
  console.log(currentUser?.roles?.find((role) => allowedRoles?.includes(role)));
  return currentUser?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : currentUser?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
