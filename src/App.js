import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/basic/loading";
import "./App.css";

const ChangePassword = lazy(() => import("./components/account/change_password"));
const ForgotPassword = lazy(() => import("./components/account/forgot"));
const LoginForm = lazy(() => import("./components/account/loginForm"));
const HomePage = lazy(() => import("./pages/homePage"));

const App = () => {
    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="dang-nhap" element={<LoginForm />} />
                    <Route path="" element={<LoginForm />} />
                    <Route path="quen-mat-khau" element={<ForgotPassword />} />
                    <Route path="doi-mat-khau" element={<ChangePassword />} />
                    {/* <Route path="quan-ly/*" element={<Management />} /> */}
                    <Route path="trang-chu" element={<HomePage />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
