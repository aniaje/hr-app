import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "./common";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (getTokenFromLocalStorage()) return <>{children}</>;

  return <Navigate to="/signin" />;
};

export default ProtectedRoute;
