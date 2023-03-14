import React, { useEffect, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { PageHeader, Button, Menu, Dropdown, Typography } from "antd";

const Header = (props) => {
    const menu = (
        <Menu
            items={[
                {
                    key: "1",
                    label: (
                        <a rel="noopener noreferrer" href="/doi-mat-khau">
                            Đổi mật khẩu
                        </a>
                    ),
                },
                {
                    type: "divider",
                },
                {
                    key: "2",
                    label: (
                        <a
                        // rel="noopener noreferrer" onClick={() => {
                        // Cookies.remove("access")
                        // Cookies.remove("refresh")
                        // navigate("/dang-nhap")
                        // }}
                        >
                            Đăng xuất
                        </a>
                    ),
                },
            ]}
        />
    );
    return (
        <div className="pageHeader">
            <Header
                ghost={false}
                title={React.createElement(
                    props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                        className: "trigger",
                        onClick: () => props.setCollapsed(!props.collapsed),
                    }
                )}
                subTitle={
                    <Typography.Title
                        level={5}
                        style={{ display: "inline-block", marginLeft: "10px" }}
                    >
                        Hệ thống quản lý kho hàng Zippo
                    </Typography.Title>
                }
                extra={[
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Button
                            key="1"
                            shape="circle"
                            type="primary"
                            icon={<UserOutlined />}
                        />
                    </Dropdown>,
                ]}
            ></Header>
        </div>
    );
};

export default Header;
