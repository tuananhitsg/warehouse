import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./components/basic/loading";
import { useDispatch } from "react-redux";
import "./App.css";
import { useSelector } from "react-redux";
import authService from "./service/auth.service";
import { setUser } from "./redux/userSlice";
import PrivateRoute from "./components/ProtectedRoute/index";
const ChangePassword = lazy(() =>
  import("./components/account/change_password")
);
const ForgotPassword = lazy(() => import("./components/account/forgot"));
const LoginForm = lazy(() => import("./components/account/loginForm"));
const HomePage = lazy(() => import("./pages/homePage"));
const LoginPage = lazy(() => import("./components/account/login"));
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  useEffect(() => {
    const userInLocalStorage = authService.getUser();
    if (userInLocalStorage) {
      dispatch(setUser(userInLocalStorage));
      navigate("/trang-chu");
    } 
  }, [dispatch, navigate]);

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="dang-nhap" element={<LoginPage />} />
          <Route path="quen-mat-khau" element={<ForgotPassword />} />
          <Route path="doi-mat-khau" element={<ChangePassword />} />
          <Route path="trang-chu" element={<HomePage />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={<HomePage />}
              exact
              isLoggedIn={user != null}
            />
            <Route
              path="trang-chu"
              element={<HomePage />}
              isLoggedIn={user != null}
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
