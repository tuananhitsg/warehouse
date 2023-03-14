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
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);

    //click item's tab to render component
    const [itemClicked, setItemClicked] = useState(1);
    function onClick(info) {
        setItemClicked(+info.key);
    }
    // const RenderHome = () => {
    //     console.log(itemClicked);
    //     if (itemClicked === 1) {
    //         return <IndexDashboard />;
    //     } else if (itemClicked === 11) {
    //         return <IndexCustomer />;
    //         return <IndexDashboard />;
    //     };
    // };

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
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "100%",
                            padding: "0 1rem",
                        }}
                    ></div>
                </Header>
            </Layout>
        </Layout>
    );
};
export default HomePage;
