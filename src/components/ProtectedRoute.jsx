import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user) return <Navigate to="/" />;

  if (role === "admin" && user.email !== "admin@gmail.com") {
    return <Navigate to="/user" />;
  }

  return children;
}

export default ProtectedRoute;
