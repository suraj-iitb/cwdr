import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks";

export const AuthenticatedRoute = ({ allowedRoles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : currentUser?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
