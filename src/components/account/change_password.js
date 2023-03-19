import { PhoneOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Row, Checkbox, Form, Input, message, Space } from "antd";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validPhone, validPassword } from "../../resources/regexp";
import tokenService from "../../service/token.service";
import userApi from "../../api/userApi";
import zxcvbn from "zxcvbn";
import "./style.scss";

const { Title } = Typography;

const ChangePassword = () => {
  // let history = useHistory();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState([]);
  const [password, setPassword] = useState("");
  console.log(password);
  // const [mess, setMess]= useState("Vui lòng nhập mật khẩu mới!");

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

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  const error_msg = () => {
    message.error("Sai mật khẩu");
  };

  const onFinish = async (values) => {
    values.new_password = password;

    if (!validPassword.test(values.old_password)) {
      message.error("Mật khẩu ít nhất 6 ký tự");
      stopLoading(0);
      return;
    }

    if (values.new_password == "") {
      message.error("Vui lòng nhập mật khẩu mới!");
      stopLoading(0);
      return;
    }

    if (values.new_password != values.repeat_password) {
      message.error("Mật khẩu mới không khớp");
      stopLoading(0);
      return;
    }

    if (testResult.score == 1 || testResult.score == 0) {
      message.error("Vui lòng chọn mật khẩu an toàn hơn");
      stopLoading(0);
      return;
    }

    const params = {
      email: "tuananhitsg@gmail.com",
      password: values.new_password,
      
    };
    console.log(params);
    const response = await userApi.changePassword(params);

    try {
      if (response.data.code == 1) {
        message.success("Đổi mật khẩu thành công");
        navigate("/dang-nhap");
      } else {
        message.error("Sai mật khẩu");
      }
    } catch (error) {
      console.log("Failed:", error);
      message.error("Sai mật khẩu");
    } finally {
      stopLoading(0);
    }
  };

  useEffect(() => {
    document.title = "Đổi mật khẩu - Quản lý kho hàng thông minh";
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Có lỗi xảy ra");
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${require("../../assets/bg.jpg")})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "absolute",
          top: "0",
          left: "0",
          height: "100vh",
          width: "100vw",
          filter: "brightness(0.5)",
        }}
      ></div>
      <Row
        justify="space-around"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col span={8} xs={18} sm={14} md={10} lg={8} style={{}}>
          <div className="logo-container">
            <img
              style={{
                width: "150px",
              }}
              src={require("../../assets/logo.png")}
            ></img>
            <Title className="logo-text" level={2}>
              Quản lý kho hàng
            </Title>
          </div>
        </Col>
        <Col
          span={8}
          xs={18}
          sm={14}
          md={10}
          lg={8}
          style={{
            backgroundColor: "white",
            padding: "50px",
            borderRadius: "10px",
          }}
        >
          <Title
            className="form-title"
            level={2}
            style={{ marginBottom: "20px" }}
          >
            Đổi mật khẩu
          </Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="new_password"
              style={{
                marginBottom: "0px",
              }}
              //   rules={[
              //       {
              //           required: true,
              //           message: "Vui lòng nhập mật khẩu mới!",
              //       },
              //   ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
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

            <Form.Item
              name="repeat_password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu mới!",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Nhập lại mật khẩu mới"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>

            <p>
              <Space>
                <Link to="/dang-nhap">Đăng nhập ngay</Link>
                hoặc
                <Link to="/quen-mat-khau">Lấy lại mật khẩu</Link>
              </Space>
            </p>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
