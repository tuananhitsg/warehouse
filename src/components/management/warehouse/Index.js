import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import WareHouseTable from "./Table";
const { Title, Text } = Typography;

const IndexWarehouse = (setTab) => {
  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Nhà kho
      </Title>

      <Row>
        <Col span={24}>
          <WareHouseTable />
        </Col>
      </Row>
    </div>
  );
};

export default IndexWarehouse;