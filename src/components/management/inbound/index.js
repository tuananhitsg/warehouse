import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import InboundTable from "./table";
const { Title, Text } = Typography;

const IndexInbound = () => {
  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Sản phẩm
      </Title>
      
      <InboundTable></InboundTable>
    </div>
  );
};

export default IndexInbound;
