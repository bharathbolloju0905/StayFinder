import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedHostRoute = ({ children }) => {
  const { user } = useUser();
  if (!user || user.role !== "host") {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedHostRoute;
