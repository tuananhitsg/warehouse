import React, { useState } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Button,
  Space,
  Typography,
  Modal,
} from "antd";
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
} from "@ant-design/icons";
import "./homePage.scss";

import IndexDashboard from "../components/management/dashboard/index";
import IndexGoods from "../components/management/goods/index";
import IndexCategory from "../components/management/category/index";
import IndexEmployee from "../components/management/employee/index";
import IndexWarehouse2 from "../components/management/warehouse/shelf/Warehouse";
import IndexWarehouse from "../components/management/warehouse/Index";
import IndexUser from "../components/account/user/userInfo";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";
import { setUser } from "../redux/userSlice";
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.info);
  // const getItem = (label, key, icon, children, required_perm, type) => {
  //   if (!userInfo || (required_perm && userInfo.is_manager == false)) {
  //     return null;
  //   }
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //     type,
  //   };
  // };
  const items = [
    getItem("Dashboard", "0", <DashboardOutlined />),
    getItem("Nhập kho", "1", <LoginOutlined />, [
      getItem("Nhập kho", "1.1"),
      getItem("Phiếu nhập kho", "1.2"),
    ]),
    getItem("Xuất kho", "2", <LogoutOutlined />, [
      getItem("Xuất kho", "2.1"),
      getItem("Phiếu xuất kho", "2.2"),
    ]),
    getItem("Quản lý kho", "3", <HomeOutlined />, [
      getItem("Kho hàng", "3.1"),
      getItem("Hàng hoá", "3.2"),
    ]),
    getItem("Sản phẩm", "4", <TagsOutlined />, [
      getItem("Sản phẩm", "4.1"),
      getItem("Loại sản phẩm", "4.2"),
    ]),
    getItem("Nhân viên", "5", <UserOutlined />, [
      getItem("Nhân viên", "5.1"),
      getItem("Đối tác", "5.2"),
    ]),
    getItem("Nhà kho", "6", <ContainerOutlined />),
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
    //handle code for log out in here
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //click item's tab to render component
  const [itemClicked, setItemClicked] = useState(1);
  function onClick(info) {
    setItemClicked(+info.key);
    console.log("info", +info.key);
  }
  const onClickMenuUser = (info) => {
    //if user click logout
    if (info.key === "logout") {
      showModal();
    } else if (info.key === "info") {
    }
  };
  const RenderHome = () => {
    switch (itemClicked) {
      case 0:
        return <IndexDashboard />;
      case 3.1:
        return <IndexWarehouse />;
      case 4.1:
        return <IndexGoods />;
      case 4.2:
        return <IndexCategory />;
      case 5.1:
        return <IndexEmployee />;
      case 6:
        return <IndexWarehouse2 />;
      // case "user":
      //   return <UserInfo />;
      case 100:
        return <IndexUser />;
      default:
        return <IndexDashboard />;
    }
  };

  const handleUserInfo = () => {
    setItemClicked(100);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    authService.removeUser();
    navigate("/dang-nhap", { replace: true });
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 24,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
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
              <Dropdown
                overlay={
                  <>
                    <Menu onClick={onClickMenuUser}>
                      <Menu.Item
                        key="info"
                        style={{
                          padding: " 12px 12px",
                        }}
                      >
                        {" "}
                        <div onClick={() => handleUserInfo()}>
                          <ProfileOutlined />
                          <Text style={{ marginLeft: "12px" }}>Thông tin</Text>
                        </div>
                        <div>
                          <Text
                          // style={{
                          //   marginLeft: "12px",
                          // }}
                          ></Text>
                        </div>
                      </Menu.Item>
                      <Menu.Item
                        key="logout"
                        style={{
                          padding: " 12px 12px",
                        }}
                      >
                        <div onClick={() => showModal()}>
                          <LogoutOutlined />
                          <Text
                            style={{
                              marginLeft: "12px",
                            }}
                          >
                            Đăng xuất
                          </Text>
                        </div>
                      </Menu.Item>
                    </Menu>
                  </>
                }
                trigger={["click"]}
              >
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
                  <Avatar
                    style={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",

                      width: "35px",
                      height: "35px",
                      marginRight: "6px",
                    }}
                  >
                    {/* {user?.lastName[0]} */}A
                  </Avatar>
                  <div style={{ display: "flex", flexDirection: "column" }}>
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
                      {user?.roles}
                    </Text>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: "0 16px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              minHeight: 360,
            }}
          >
            <RenderHome />
          </div>
        </Content>
      </Layout>
      <Modal
        title="Đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn đăng xuất không?</p>
      </Modal>
    </Layout>
  );
};
export default HomePage;
