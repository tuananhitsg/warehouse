import React from "react";
import { Menu, Space, Layout } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  DashboardOutlined,
  SettingOutlined,
  ProfileOutlined,
  ContainerOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthService from "../../../service/auth.service";
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
  
  const user = useSelector((state) => state.userReducer.info);
  const isAdmin = AuthService.getUser().roles.includes("ADMIN");
  
  const items = [
    getItem(<Link to={"/"}>Dashboard</Link>, "0", <DashboardOutlined />),
    getItem("Nhập kho", "1", <LoginOutlined />, [
      getItem(<Link to={"/tao-phieu-mua"}>Tạo phiếu mua</Link>, "1.1"),
      getItem(<Link to={"/danh-sach-phieu-mua"}>Phiếu mua</Link>, "1.2"),
      getItem(<Link to={"/tao-phieu-nhap"}>Tạo phiếu nhập</Link>, "1.3"),
      getItem(<Link to={"/danh-sach-phieu-nhap"}>Phiếu nhập</Link>, "1.4"),
    ]),
    getItem("Xuất kho", "2", <LogoutOutlined />, [
      getItem(<Link to={"/tao-phieu-xuat"}>Tạo phiếu bán</Link>, "2.1"),
      getItem(<Link to={"/danh-sach-phieu-xuat"}>Tạo phiếu xuất</Link>, "2.2"),
    ]),
    getItem("Quản lý kho", "3", <HomeOutlined />, [
      getItem(<Link to={"/nha-kho"}>Kho hàng</Link>, "3.1"),
    ]),
    getItem("Sản phẩm", "4", <TagsOutlined />, [
      getItem(<Link to={"/san-pham"}>Sản phẩm</Link>, "4.1"),
      getItem(<Link to={"/loai-san-pham"}>Loại sản phẩm</Link>, "4.2"),
    ]),
    isAdmin && getItem(<Link to={"/nhan-vien"}>Nhân viên</Link>, "5", <UserOutlined />),
    getItem(<Link to={"/doi-tac"}>Đối tác</Link>, "6", <TeamOutlined />),
  ];
  const onChangeItem = (value) => {
    console.log(value);
    localStorage.setItem("selectedItemKey", value.key);
    setSelectedItem(value.key);
  };
  const localSidebarKey = localStorage.getItem("selectedItemKey");

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={234}
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
          items={items}
          selectedKeys={localSidebarKey ? [localSidebarKey] : [selectedItem]}
        />
      </Sider>
    </>
  );
};

export { Sidebar };
