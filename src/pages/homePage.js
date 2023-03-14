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
import Cookies from "js-cookie";
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
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    DashboardTwoTone,
    BellOutlined,
    ProfileOutlined,
    ThunderboltOutlined,
    ProjectOutlined,
} from "@ant-design/icons";
import "./homePage.scss";
import { useNavigate } from "react-router-dom";
import tokenService from "../service/token.service";
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

const items = [
    getItem("Dashboard", "", <DashboardOutlined />),
    getItem("Nhập kho", "quan-ly-nhap-kho", <LoginOutlined />, [
        getItem("Nhập kho", "nhap-kho"),
        getItem("Phiếu nhập kho", "phieu-nhap-kho"),
    ]),
    getItem("Xuất kho", "quan-ly-xuat-kho", <LogoutOutlined />, [
        getItem("Xuất kho", "xuat-kho"),
        getItem("Phiếu xuất kho", "phieu-xuat-kho"),
    ]),
    getItem("Quản lý tồn kho", "quan-ly-ton-kho", <HomeOutlined />, [
        getItem("Phiếu kiểm kê", "phieu-kiem-ke"),
        getItem("Lịch sử biến động kho", "bien-dong-kho"),
    ]),
    getItem("Sản phẩm", "quan-ly-san-pham", <TagsOutlined />, [
        getItem("Danh sách sản phẩm", "danh-sach-san-pham"),
        getItem("Nhóm sản phẩm", "nhom-san-pham"),
        getItem("Kích thước", "kich-thuoc"),
        getItem("Đơn vị tính", "don-vi-tinh"),
    ]),
    getItem("Nhân viên", "quan-ly-nhan-vien", <UserOutlined />, [
        getItem("Nhà cung cấp", "nha-cung-cap"),
        getItem("Nhân viên", "nhan-vien"),
    ]),
];

const HomePage = () => {
    const navigate = useNavigate();

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
    }
    const onClickMenuUser = (info) => {
        //if user click logout
        if (info.key === "logout") {
            //show model
            showModal();
        }
    };
    // const RenderHome = () => {
    //     console.log(itemClicked);
    //     if (itemClicked === 1) {
    //         return <IndexDashboard />;
    //     } else if (itemClicked === 11) {
    //         return <IndexCustomer />;
    //         return <IndexDashboard />;
    //     };
    // };
    const handleLogout = () => {
        //redict to login page
        navigate("/dang-nhap");
        //delete user in local storage
        tokenService.removeUser();
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
                    defaultSelectedKeys={["1"]}
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
                                                key="setting"
                                                style={{
                                                    padding: " 12px 12px",
                                                }}
                                            >
                                                {" "}
                                                <div>
                                                    <SettingOutlined />
                                                    <Text
                                                        style={{
                                                            marginLeft: "12px",
                                                        }}
                                                    >
                                                        Cài đặt
                                                    </Text>
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item
                                                key="logout"
                                                style={{
                                                    padding: " 12px 12px",
                                                }}
                                            >
                                                <div
                                                    onClick={() => showModal()}
                                                >
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
                                        marginLeft: "0.5rem",
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
                                        {/* {user?.lastName[0]} */}L
                                    </Avatar>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            color: "#333",
                                        }}
                                    >
                                        tuan anh
                                    </Text>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
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
