import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Typography, Button, Col, Row, Checkbox, Input, message } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { validEmail, validPassword } from "../../resources/regexp";
import "./style.scss";
import { setUser } from "../../redux/userSlice";
import authService from "../../service/auth.service";
import { Formik, Field, Form, ErrorMessage, FastField } from "formik";
import { loginValues } from "./initValues";
import InputField from "../../custom/InputField/index";
const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    console.log("values:", email, password);
    try {
      const res = await userApi.login(values);
      console.log("token header:", res.token);
      if (res) {
        localStorage.setItem("token", res.token);
        authService.setUser(res);
        dispatch(setUser(res));
        navigate("/trang-chu");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log();
  return (
    <div>
      <div className="login-form-container">
        <div className="account-common-page">
          <div className="account-wrapper">
            <div className="login-form">
              <Title level={3} style={{ textAlign: "center" }}>
                Đăng nhập
              </Title>
              <div className="form-account">
                <Formik
                  initialValues={loginValues.initial}
                  validationSchema={loginValues.validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => {
                    return (
                      <Form>
                        <Row gutters={[0, 8]}>
                          <Col span={24}>
                            <Input
                              name="email"
                              placeholder="Email"
                              prefix={<MailOutlined />}
                              maxLength={50}
                              style={{ fontSize: "13px", padding: "10px" }}
                            />
                          </Col>
                          <Col span={24}>
                            <Input.Password
                              name="password"
                              placeholder="Mật khẩu"
                              prefix={<LockOutlined />}
                              maxLength={200}
                              style={{
                                marginTop: "1.5rem",
                                marginBottom: "1.5rem",
                                fontSize: "13px",
                                padding: "10px",
                              }}
                            />
                          </Col>
                          <Col span={24}>
                            <div className="button-container">
                              <button
                                className="button-custom"
                                type="submit"
                                onClick={handleSubmit}
                              >
                                Đăng nhập
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <div className="login-form-footer">
                <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
