import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
