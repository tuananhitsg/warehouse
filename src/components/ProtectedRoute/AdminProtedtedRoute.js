import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthService from "../../service/auth.service";
const AdminProtectedRoute = ({ roleName }) => {

  const isLogin = AuthService.getLocalToken();
  const isAdmin = AuthService.getUser().roles.includes(roleName);
  console.log("isAdmin" , isAdmin);

  return isLogin && isAdmin ?  (
    <Outlet />
  ) : (
    <Navigate to="/landingPage" replace />
  );
};

export { AdminProtectedRoute };
