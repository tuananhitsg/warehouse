import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  TagsOutlined,
  DashboardOutlined,
  TeamOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import AuthService from "../../../service/auth.service";
import { useSelector } from "react-redux";
import "./Sidebar.scss";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("0");
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.info);
  const userRoles = AuthService.getUser().roles;
  const isAdmin = userRoles.includes("ADMIN");
  const isSystemManage = userRoles.includes("SYSTEM_MANAGER");
  console.log("location", location.pathname);
  const items = [
    getItem(<Link to={"/"}>Dashboard</Link>, "0", <DashboardOutlined />),
    getItem("Nhập kho", "1", <LoginOutlined />, [
      getItem(<Link to={"/tao-phieu-mua"}>Tạo phiếu mua</Link>, "1.1"),
      getItem(<Link to={"/danh-sach-phieu-mua"}>Phiếu mua</Link>, "1.2"),
      getItem(<Link to={"/tao-phieu-nhap"}>Tạo phiếu nhập</Link>, "1.3"),
      getItem(<Link to={"/danh-sach-phieu-nhap"}>Phiếu nhập</Link>, "1.4"),
    ]),

    getItem("Xuất kho", "2", <LogoutOutlined />, [
      getItem(<Link to={"/tao-phieu-ban"}>Tạo phiếu bán</Link>, "2.1"),
      getItem(<Link to={"/danh-sach-phieu-ban"}>Phiếu bán</Link>, "2.2"),
      getItem(<Link to={"/tao-phieu-xuat"}>Tạo phiếu xuất</Link>, "2.3"),
      getItem(<Link to={"/danh-sach-phieu-xuat"}>Phiếu xuất</Link>, "2.4"),
    ]),
    getItem("Quản lý kho", "3", <HomeOutlined />, [
      getItem(<Link to={"/nha-kho"}>Kho hàng</Link>, "3.1"),
    ]),
    getItem("Sản phẩm", "4", <TagsOutlined />, [
      getItem(<Link to={"/san-pham"}>Sản phẩm</Link>, "4.1"),
      isAdmin &&
        getItem(<Link to={"/loai-san-pham"}>Loại sản phẩm</Link>, "4.2"),
    ]),
    isAdmin &&
      getItem(<Link to={"/nhan-vien"}>Nhân viên</Link>, "5", <UserOutlined />),
    getItem(<Link to={"/doi-tac"}>Đối tác</Link>, "6", <TeamOutlined />),
    getItem("Thống kê", "7", <PieChartOutlined />, [
      getItem(
        <Link to={"thong-ke/so-luong-trong-kho"}>Hàng trong kho</Link>,
        "7.1"
      ),
      getItem(
        <Link to={"thong-ke/so-luong-nhap-kho"}>Hàng nhập kho</Link>,
        "7.2"
      ),
      getItem(
        <Link to={"thong-ke/so-luong-xuat-kho"}>Hàng xuất kho</Link>,
        "7.3"
      ),
    ]),
  ];
  const items2 = [
    getItem(<Link to={"/"}>Dashboard</Link>, "0", <DashboardOutlined />),
    getItem(<Link to={"/nhan-vien"}>Nhân viên</Link>, "5", <UserOutlined />),
  ];

  const onChangeItem = (value) => {
    localStorage.setItem("selectedItemKey", value.key);
    setSelectedItem(value.key);
    //navigate(value.key);
  };

  const selectedItemFromPathname = items.find((item) => {
    // if (Array.isArray(item.children)) {
    //   return item.children.find(
    //     (child) => location.pathname === child.children.props.to
    //   );
    // }
    // return location.pathname === item.children.props.to;
  });

  const selectedItemKey =
    selectedItemFromPathname && selectedItemFromPathname.key;

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={234}
        className="scroll-bar"
        style={{
          overflow: "auto",
          height: "100vh",
          //position: 'fixed',
          //left: 0,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Menu
          theme="dark"
          onSelect={onChangeItem}
          mode="inline"
          items={isSystemManage ? items2 : items}
          selectedKeys={
            selectedItemKey || localStorage.getItem("selectedItemKey")
              ? [selectedItemKey || localStorage.getItem("selectedItemKey")]
              : [selectedItem]
          }
        />
      </Sider>
    </>
  );
};

export { Sidebar };
