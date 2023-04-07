import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import OutboundTable from "./Table";
const { Title, Text } = Typography;

const IndexOutbound = () => {
  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Sản phẩm
      </Title>
      
      <OutboundTable></OutboundTable>
    </div>
  );
};

export default IndexOutbound;
