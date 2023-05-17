import React, { useState } from "react";
import "./Header.scss";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Typography,
  message,
  Button,
  Space,
  Modal,
} from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import authService from "../../../service/auth.service";
import { setUser } from "../../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
const { Text, Title } = Typography;
const { Header } = Layout;

const HeaderCustom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = JSON.parse(localStorage.getItem("user"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
    //handle code for log out in here
  };
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      authService.removeUser();
      dispatch(setUser(null));
      navigate("/dang-nhap");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      label: "Thông tin",
      key: "1",
      icon: <ProfileOutlined />,
    },
    {
      label: "Đăng xuất",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];
  const handleMenuClick = (e) => {
    console.log("click", e);
    if (e.key === "2") {
      handleLogout();
    } else if (e.key === "1") {
      navigate("/thong-tin");
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  // const warning = () => {
  //   Modal.warning({
  //     title: 'Đăng xuát',
  //     content: 'some messages...some messages...',
  //   });
  // };
  return (
    <Header
      className="header"
      style={{
        zIndex: 999,
        padding: 0,
        position: "sticky",
        top: 0,
        background: colorBgContainer,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          padding: "0 1rem",
        }}
      >
        <div></div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown menu={menuProps}>
            <Space>
              <div
                className="avt_group"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  //marginLeft: "0.5rem",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    marginRight: "0.5rem",
                  }}
                >
                  <Text style={{ fontWeight: "500", color: "#333" }}>
                    {user?.fullName}
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#abb4bc",
                    }}
                  >
                    {user?.roles.includes("ADMIN")
                      ? "Quản lý"
                      : "Nhân viên"}
                  </Text>
                </div>
                <Avatar
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",

                    width: "35px",
                    height: "35px",
                    marginRight: "6px",
                  }}
                  icon={<UserOutlined />}
                ></Avatar>
              </div>
            </Space>
          </Dropdown>
        </div>
      </div>
      {/* <Modal
        title="Đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={360}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <Title level={4}>Bạn có muốn đăng xuất?</Title>
      </Modal> */}
    </Header>
  );
};
export { HeaderCustom };
