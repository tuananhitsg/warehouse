import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import InboundTable from "./table";
const { Title, Text } = Typography;

const IndexInbound = () => {
  return (
    <div className="site-card-wrapper">

      
      <InboundTable></InboundTable>
    </div>
  );
};

export default IndexInbound;
