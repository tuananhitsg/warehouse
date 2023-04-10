import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import PartnerTable from "./Table";
const { Title, Text } = Typography;

const IndexCategory = () => {
  return (
    <div className="site-card-wrapper">


      <PartnerTable></PartnerTable>
    </div>
  );
};

export default IndexCategory;
