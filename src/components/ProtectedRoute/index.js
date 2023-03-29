// import React from 'react';
// import { Route, Link } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isLoggedIn ? (
//         <Component {...props} />
//       ) : (
//         <Link to={{ pathname: '/dang-nhap' }} />
//       )
//     }
//   />
// );

// export default PrivateRoute;
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.userReducer !== null);
  return isLoggedIn ? <Outlet /> : <Navigate to="/dang-nhap" />;
};

export default PrivateRoute;
