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
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import store from "../../../store/store";
import { Bar } from "react-chartjs-2";
import "./sidenav.scss";

const { Sider } = Layout;
const { Title } = Typography;

const rootSubmenuKeys = [
    "quan-ly-nhap-kho",
    "quan-ly-xuat-kho",
    "quan-ly-ton-kho",
    "quan-ly-san-pham",
    "quan-ly-nhan-vien",
    "quan-ly-bao-cao",
];
const SideNav = (props) => {
    const [openKeys, setOpenKeys] = useState();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        store.subscribe(() => {
            setUserInfo(store.getState().user.info);
        });
    }, []);

    useEffect(() => {
        console.log("change props.userInfo in sidenav", props.userInfo);
        setUserInfo(props.userInfo);
    }, [props.userInfo]);

    const getItem = (label, key, icon, children, required_perm, type) => {
        // if (!userInfo || (required_perm && userInfo.is_manager == false)) {
        //     return null;
        // }
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    };

    const getChildItem = (label, key, required_perm) => {
        if (required_perm && userInfo && userInfo.is_manager == false) {
            return null;
        }
        return {
            key,
            label,
        };
    };

    useEffect(() => {
        var _items = [
            getItem("Dashboard", "", <DashboardOutlined />),
            getItem("Nhập kho", "quan-ly-nhap-kho", <LoginOutlined />, [
                getChildItem("Nhập kho", "nhap-kho"),
                getChildItem("Phiếu nhập kho", "phieu-nhap-kho"),
            ]),
            getItem("Xuất kho", "quan-ly-xuat-kho", <LogoutOutlined />, [
                getChildItem("Xuất kho", "xuat-kho"),
                getChildItem("Phiếu xuất kho", "phieu-xuat-kho"),
            ]),
            getItem("Quản lý tồn kho", "quan-ly-ton-kho", <HomeOutlined />, [
                getChildItem("Phiếu kiểm kê", "phieu-kiem-ke"),
                getChildItem("Lịch sử biến động kho", "bien-dong-kho"),
            ]),
            getItem("Sản phẩm", "quan-ly-san-pham", <TagsOutlined />, [
                getChildItem("Danh sách sản phẩm", "danh-sach-san-pham"),
                getChildItem("Nhóm sản phẩm", "nhom-san-pham"),
                getChildItem("Kích thước", "kich-thuoc"),
                getChildItem("Đơn vị tính", "don-vi-tinh"),
            ]),
            getItem("Nhân viên", "quan-ly-nhan-vien", <UserOutlined />, [
                getChildItem("Nhà cung cấp", "nha-cung-cap"),
                getChildItem("Nhân viên", "nhan-vien", true),
            ]),
            getItem(
                "Thống kê",
                "quan-ly-bao-cao",
                <BarChartOutlined />,
                [
                    getChildItem(
                        "Doanh số bán hàng",
                        "thong-ke-doanh-so-ban-hang"
                    ),
                    getChildItem("Trả hàng", "thong-ke-tra-hang"),
                    getChildItem("Khuyến mãi", "thong-ke-khuyen-mai"),
                    getChildItem("Nhập hàng", "thong-ke-nhap-hang"),
                    getChildItem("Tồn kho", "thong-ke-ton-kho"),
                ],
                true
            ),
        ];
        setItems(_items);
    }, [userInfo]);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <div className="sidenav-container">
            {/* <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    items={items}
                    //onSelect={onSelect}
                    //onClick={onClick}
                />
            </Sider> */
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
        //   onClick={onClick}
        />
      </Sider>}
        </div>
    );
};
export default SideNav;
