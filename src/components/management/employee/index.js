import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import EmployeeTable from "./table";
const { Title, Text } = Typography;

const IndexCategory = () => {
  return (
    <div className="site-card-wrapper">


      <EmployeeTable></EmployeeTable>
    </div>
  );
};

export default IndexCategory;
