import React from "react";
import "./MainLayout.scss";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { HeaderCustom } from "../components/layout/header";
import { Sidebar } from "../components/layout/sidebar";

const { Content, Footer } = Layout;
const MainLayout = () => {
  return (
    <>
      <Layout className="container">
        <Sidebar/>
        <Layout className="container-content">
          <HeaderCustom />
          <Content style={{ margin: "0 16px", height: "80vh",overflow: "auto" }}>
            <Outlet  />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Warehouse management ©2023 Created by Nhom 5
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export { MainLayout };
