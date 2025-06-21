import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
const ProtectedHostRoute = ({ children }) => {
  const { user } = useUser();
  if (!user || user.role !== "host") {
    toast.error("You must be a host to access this page.");
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedHostRoute;
