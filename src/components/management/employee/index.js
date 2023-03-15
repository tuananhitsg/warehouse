import React, { useState } from "react";
import { Input, Col, Row, Typography, Button, Modal } from "antd";

import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import TableCustomer from "../customer/TableCustomer";
import ModelAddCustomer from "../customer/ModelAddCustomer";
import TableEmployee from "./TableEmployee";
import ModelAddEmployee from "./ModelAddEmployee";

const { Title, Text } = Typography;
const IndexEmployee = () => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);
  
  // //model
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);

  //   //handle code for log out in here

  //   ////////
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  // /////

  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Nhân Viên
      </Title>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={12}>
          <Input
            placeholder="Nhập tên, số điện thoại hoặc email..."
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={9}>
          {" "}
          <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
            Thêm
          </Button>
        </Col>
        {/* <Col style={{ margin: "0 1rem" }}>
          {" "}
          <Button type="primary" size="large" icon={<ToolOutlined />}>
            Cập nhật
          </Button>
        </Col> */}
        <Col span={1}>
          <Button type="primary" icon={<DownloadOutlined />}>
            Xuất file
          </Button>
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
        <Col span={24}>
          <TableEmployee />
        </Col>
      </Row>
      {showModalAddCustomer ? (
        <ModelAddEmployee
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
        />
      ) : null}
    </div>
  );
};
export default IndexEmployee;
