import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import GoodsTable from "./table";
const { Title, Text } = Typography;

const IndexGoods = () => {
  return (
    <div className="site-card-wrapper">

      
      <GoodsTable></GoodsTable>
    </div>
  );
};

export default IndexGoods;
