import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import GoodsTable from "./table";
const { Title, Text } = Typography;

const IndexGoods = () => {
  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Sản phẩm
      </Title>
      <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
        <Col span={12}>
          <Input
            placeholder="Tìm kiếm sản phẩm theo mã, tên"
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <GoodsTable></GoodsTable>
    </div>
  );
};

export default IndexGoods;
