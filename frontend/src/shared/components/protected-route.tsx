import { Navigate } from "react-router-dom";
import { UserData } from "../../App";

type ProtectedRouteProps = {
  user: UserData;
  children: React.ReactNode;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to='/' replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
