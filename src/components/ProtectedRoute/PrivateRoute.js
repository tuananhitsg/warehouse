import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthService from "../../service/auth.service";
const PrivateRoute = ({  }) => {
  const isLogin = AuthService.getLocalToken();
  return isLogin? (
    <Outlet />
  ) : (
    <Navigate to="/dang-nhap" replace />
  );
};

export { PrivateRoute };
