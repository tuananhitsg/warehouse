import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import Loading from "./components/basic/loading";
import { useDispatch } from 'react-redux';
import "./App.css";
import tokenService from "./service/token.service";
import {setUser} from "./redux/userSlice";

const ChangePassword = lazy(() => import("./components/account/change_password"));
const ForgotPassword = lazy(() => import("./components/account/forgot"));
const LoginForm = lazy(() => import("./components/account/loginForm"));
const HomePage = lazy(() => import("./pages/homePage"));

const App = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userInLocalStorage = tokenService.getUser();
        if (userInLocalStorage) {
            dispatch(setUser(userInLocalStorage));
            navigate("/trang-chu");
        } else {
            navigate("/dang-nhap");
        }
    },[]);

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
