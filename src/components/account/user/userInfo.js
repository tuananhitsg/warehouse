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
import userApi from "../../../api/userApi";
import zxcvbn from "zxcvbn";
import { validPassword } from "../../../resources/regexp";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import { setUser } from "../../../redux/userSlice";
const { Title, Text } = Typography;

const UserInfo = () => {
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState([]);
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const reload = useSelector((state) => state.reloadReducer.reload);
  const dispatch = useDispatch();

  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;
  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "";
      case 1:
        return "Yếu";
      case 2:
        return "Trung bình";
      case 3:
        return "Mạnh";
      case 4:
        return "Rất mạnh";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });

  const handleInputChange = (e) => {
    setFullName(e.target.value);
  };

  useEffect(() => {
    const userCode = authService.getUser().code;
    const fetchData = async (id) => {
      try {
        const res = await employeeApi.getEmployeeById(id);
        console.log("res", res);
        if (res) {
          form.setFieldsValue({
            fullName: res.fullName,
            email: res.email,
            code: res.code,
            role: res.roles[0].name,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(userCode);
  }, [reload]);
  const stopLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };
  const handleChangePass = async () => {
    if (!validPassword.test(password)) {
      message.error(
        "Mật khẩu tối thiểu 8 ký tự, phải chứa ít nhất 1 chữ viết hoa, 1 chữ viết thường, 1 số và 1 ký tự đặc biệt."
      );
      stopLoading(0);
      return;
    }
    if (!validPassword.test(repeatPassword)) {
      message.error(
        "Mật khẩu lặp lại tối thiểu 8 ký tự, phải chứa ít nhất 1 chữ viết hoa, 1 chữ viết thường, 1 số và 1 ký tự đặc biệt."
      );
      stopLoading(0);
      return;
    }
    if (password === "") {
      message.error("Vui lòng nhập mật khẩu mới!");
      stopLoading(0);
      return;
    }

    if (password !== repeatPassword) {
      message.error("Mật khẩu mới không khớp");
      stopLoading(0);
      return;
    }

    if (testResult.score === 1 || testResult.score === 0) {
      message.error("Vui lòng chọn mật khẩu an toàn hơn");
      stopLoading(0);
      return;
    }
    const params = {
      email: email,
      password: password,
    };
    console.log("params:", params);
    try {
      const response = await userApi.changePassword(params);
      if (response) {
        message.success("Đổi mật khẩu thành công");
      } else {
        message.error("Xảy ra lỗi");
      }
    } catch (error) {
      console.log("Failed:", error);
      message.error("Xảy ra lỗi");
    } finally {
      stopLoading(0);
    }
  };
  const handleUpdate = async (value) => {
    const { fullName, code } = value;
    console.log("value", value);
    const params = {
      fullName: fullName,
    };

    try {
      const res = await employeeApi.updateEmployee(code, params);

      if (res) {
        dispatch(setUser(res));
        //authService.setUser(res);
        dispatch(setReload(!reload));
        setTimeout(() => {
          message.success("Cập nhật thành công");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgotPass = async () => {
    const params = {
      email: email,
    };
    try {
      const res = await userApi.forgetPassword(params);
      if (res) {
        message.success(
          "Link đổi mật khẩu đã được gửi tới mail " +
            email +
            ", vui lòng kiểm tra mail."
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        message.error("Email không tồn tại");
      }
    }
  };
  return (
    <div className="site-card-wrapper">
      <div className="form-wrapper">
        <Row
          style={{
            marginTop: "1rem",
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
            <Form
              onFinish={handleUpdate}
              form={form}
              layout="horizontal"
              labelAlign="left"
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 17,
              }}
            >
              <Row>
                <Col span={12}>
                  <Form.Item name="code" label="Mã nhân viên">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="fullName" label="Họ và tên">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="email" label="Email">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="role" label="Vai trò">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col span={12}>
                  <Title level={4}>Đổi mật khẩu</Title>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="new_password" label="Mật khẩu mới">
                    <Input.Password
                      type="password"
                      placeholder="Mật khẩu mới"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="progress" style={{ height: "7px" }}>
                      <div
                        className="progress-bar"
                        style={changePasswordColor()}
                      ></div>
                    </div>
                    <p
                      style={{
                        color: funcProgressColor(),
                        textAlign: "right",
                        marginTop: "0px",
                      }}
                    >
                      {createPassLabel()}
                    </p>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="repeat_password"
                    label="Nhập lại mật khẩu mới"
                  >
                    <Input.Password
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleChangePass}
                    disabled={!password || !repeatPassword}
                  >
                    Đổi mật khẩu
                  </Button>
                </Col>
                <Col span={3}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleForgotPass}
                  >
                    Quên mật khẩu
                  </Button>
                </Col>
              </Row>
              {/* <Row style={{ marginTop: "1rem" }} gutter={16}>
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
                <Input style={{ width: "50%" }} readOnly value={code} name="code"/>
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
                  readOnly
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
            </Row> */}
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default UserInfo;
