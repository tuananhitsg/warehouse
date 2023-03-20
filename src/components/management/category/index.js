import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import CategoryTable from "./table";
const { Title, Text } = Typography;

const IndexCategory = () => {
  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Loại sản phẩm
      </Title>

      <CategoryTable></CategoryTable>
    </div>
  );
};

export default IndexCategory;