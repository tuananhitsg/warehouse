import React from "react";
import { Col, Row, Typography } from "antd";


import CardDashboard from "./CardDashboard";
import ColumnChart from "./ColunmChart";
import PieChart from "./PieChart";


const { Title, Text } = Typography;
const IndexDashboard = () => {
  return (
    <div className="site-card-wrapper">
      <Title level={5}>Dashboard</Title>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={6}>
          <CardDashboard />
        </Col>
        <Col span={6}>
          <CardDashboard />
        </Col>
        <Col span={6}>
          <CardDashboard />
        </Col>
        <Col span={6}>
          <CardDashboard />
        </Col>
      </Row>
      <Row
        style={{ margin: "4rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={11}>
          <ColumnChart />
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <PieChart />
        </Col>
      </Row>

      <Row
        style={{ margin: "4rem 0 2rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
       
      </Row>
    </div>
  );
};
export default IndexDashboard;
