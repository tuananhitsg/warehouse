import "./App.css";
import React, { useEffect, useState, Component } from "react";
import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loading from "./components/basic/loading";

import { useSelector } from "react-redux";
import authService from "./service/auth.service";
import { setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";

import {
  AdminProtectedRoute,
  PrivateRoute,
} from "./components/ProtectedRoute/index";
import { MainLayout } from "./pages/index";

import IndexDashboard from "./components/management/dashboard/index";
import IndexGoods from "./components/management/goods/index";
import IndexCategory from "./components/management/category/index";
import IndexEmployee from "./components/management/employee/index";
import IndexWarehouse2 from "./components/management/warehouse/indexRoute";
import IndexWarehouse from "./components/management/warehouse/index";
import IndexUser from "./components/account/user/userInfo";
import IndexReceipt from "./components/management/inbound/index";
import IndexPartner from "./components/management/partner/index";
import IndexOutbound from "./components/management/outbound/index";
import IndexInbound from "./components/management/inbound/inventoryInbound/indexInbound";
import { TablePurchaseReceipt } from "./components/management/inbound/purchase/index";

import LoginPage from "./components/account/login";
import ChangePassword from "./components/account/change_password";
import ForgotPassword from "./components/account/forgot";
// link cũ
// const HomePage = lazy(() => import("./pages/homePage"));

// const Warehouse = lazy(() =>
//   import("./components/management/warehouse/Warehouse")
// );

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <IndexDashboard />,
          },
          {
            path: "thong-tin",
            element: <IndexUser />,
          },
          {
            path: "tao-phieu-mua",
            element: <IndexInbound />,
          },
          {
            path: "danh-sach-phieu-mua",
            element: <TablePurchaseReceipt />,
          },
          {
            path: "danh-sach-phieu-nhap",
            element: <IndexReceipt />,
          },
          {
            path: "tao-phieu-xuat",
            element: <IndexOutbound />,
          },
          {
            path: "danh-sach-phieu-xuat",
            element: <IndexOutbound />,
          },
          {
            path: "nha-kho",
            element: <IndexWarehouse2 />,
          },
          {
            path: "san-pham",
            element: <IndexGoods />,
          },
          {
            path: "loai-san-pham",
            element: <IndexCategory />,
          },
          {
            path: "nhan-vien",
            element: <AdminProtectedRoute roleName={"ADMIN"} />,
            children: [
              {
                path: "/nhan-vien",
                element: <IndexEmployee />,
              },
            ],
          },
          {
            path: "doi-tac",
            element: <IndexPartner />,
          },
        ],
      },
    ],
  },

  {
    path: "dang-nhap",
    element: <LoginPage />,
  },
  {
    path: "quen-mat-khau",
    element: <ForgotPassword />,
  },
  {
    path: "doi-mat-khau",
    element: <ChangePassword />,
  },
]);
const App = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.userReducer);
  // useEffect(() => {
  //   const userInLocalStorage = authService.getUser();
  //   const token = authService.getLocalToken();
  //   if (userInLocalStorage) {
  //     dispatch(setUser(userInLocalStorage));
  //     navigate("/trang-chu");
  //   } else {
  //     navigate("/dang-nhap");
  //   }
  // }, []);

  return (
    <div className="App">
      <React.Fragment>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </React.Fragment>
    </div>
  );
};

export default App;
