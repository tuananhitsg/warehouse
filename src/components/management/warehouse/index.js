import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import WareHouseTable from "./Table";
const { Title, Text } = Typography;
const IndexWarehouse = ({ setTab }) => {
  return (
    <div className="site-card-wrapper">
      <Row>
        <Col span={24}>
          <WareHouseTable setTab={setTab} />
        </Col>
      </Row>
    </div>
  );
};

export default IndexWarehouse;
