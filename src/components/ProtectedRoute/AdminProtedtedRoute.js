import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!currentUser;
  console.log("currentUserInProtectedRoute", currentUser);
  return currentUser.roles[0] === "ADMIN" && isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/landingPage"/>
  );
};

export default AdminProtectedRoute;
