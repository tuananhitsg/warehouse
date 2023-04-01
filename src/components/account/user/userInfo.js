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
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const handleInputChange = (e) => {
    setFullName(e.target.value);
  };

  useEffect(() => {
    const userCode = authService.getUser().code;

    // setFullName(user.fullName);
    // setEmail(user.email);
    // setCode(user.code);
    // setRole(user.roles[0]);
    // setSex(user.sex);
    // setUser(user);
    const fetchData = async (id) => {
      try {
        const res = await employeeApi.getEmployeeById(id);
        console.log("res", res);
        if (res) {
          setFullName(res.fullName);
          setEmail(res.email);
          setCode(res.code);
          setRole(res.roles[0].name);
          setSex(res.sex);
          console.log("res role:", role);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(userCode);
  }, []);
  const handleUpdate = async () => {
    const params ={
      fullName: fullName,
      sex: sex,
      role: role,
    }
    console.log("code va daata:", code, params);
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
                <Input style={{ width: "50%" }} disabled value={code} name="code"/>
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
        </Col>
      </Row>
    </div>
  );
};
export default UserInfo;
