import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import GoodsTable from "./table";

const IndexGoods = () => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
        <Col span={12}>
          <Input
            placeholder="Tìm kiếm sản phẩm theo mã, tên"
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <Row
        style={{ margin: "1rem 0 1rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        
      </Row>
      <GoodsTable></GoodsTable>
    </div>
  );
};

export default IndexGoods;
