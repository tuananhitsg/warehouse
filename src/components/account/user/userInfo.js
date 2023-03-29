import React, { useEffect, useState } from "react";
import {
  Input,
  Col,
  Row,
  Form,
  Typography,
  message,
  Avatar,
  Breadcrumb,
  Upload,
  Button,
} from "antd";

import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import authService from "../../../service/auth.service";
import employeeApi from "../../../api/employeeApi";
const { Title, Text } = Typography;

const UserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  console.log(user);
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const handleInputChange = (e) => {
    setFullName(e.target.value);
  };

  useEffect(() => {
    const user = authService.getUser();
    setFullName(user.fullName);
    setEmail(user.email);
    setCode(user.code);
  }, []);
  console.log(fullName);
  const handleUpdate = async (params) => {
    try {
      const res = await employeeApi.updateEmployee(code, params);
      console.log(user.code);
      if (res) {
        setTimeout(() => {
          message.success("Cập nhật thành công");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="site-card-wrapper">
      <Row
        style={{
          backgroundColor: "white",
          height: "80vh",
          borderRadius: "8px",
          padding: "24px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={24}>
          <Form onFinish={handleUpdate}>
            <Row style={{ marginTop: "1rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Mã nhân viên
                </p>
              </Col>
              <Col span={14}>
                <Input style={{ width: "50%" }} disabled value={code} />
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Họ và tên
                </p>
              </Col>
              <Col span={14}>
                <Input
                  style={{ width: "50%" }}
                  value={fullName}
                  name="fullName"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Email
                </p>
              </Col>
              <Col span={14}>
                <Input
                  style={{ width: "50%" }}
                  value={email}
                  name="email"
                  disabled
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              ></Col>
              <Col span={14}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Col>
            </Row>
          </Form>

          <Form style={{ marginTop: "2rem" }}>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Mật khẩu hiện tại
                </p>
              </Col>
              <Col span={14}>
                <Input.Password style={{ width: "50%" }} />
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Mật khẩu mới
                </p>
              </Col>
              <Col span={14}>
                <Input.Password style={{ width: "50%" }} />
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              >
                <p
                  style={{
                    color: "#4f4f4f",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Xác nhận mật khẩu
                </p>
              </Col>
              <Col span={14}>
                <Input.Password style={{ width: "50%" }} />
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }} gutter={16}>
              <Col
                span={10}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="gutter-row"
              ></Col>
              <Col span={14}>
                <Button type="primary">Lưu</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default UserInfo;
