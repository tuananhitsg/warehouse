import "../utils/formError.scss";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  Form as FormAnt,
  Typography,
  Button,
  Col,
  Row,
  Checkbox,
  Input,
  message,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import "./style.scss";
import { setUser } from "../../redux/userSlice";
import authService from "../../service/auth.service";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import { loginValues } from "../utils/initValues";
const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const res = await userApi.login(values);
      if (res) {
        console.log("res login:", res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        authService.setUser(res);

        dispatch(setUser(res));
        navigate("/");
      }
    } catch (err) {
      message.error("Sai email hoặc mật khẩu");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <Row justify="space-around" align="middle">
          <Col span={22}>
            <div className="login-form-header">
              <Title level={3} style={{ textAlign: "center" }}>
                Đăng nhập
              </Title>
            </div>
          </Col>
          <Col span={20}>
            <div className="login-form-body">
              <Formik
                initialValues={{ ...loginValues.initial }}
                validationSchema={loginValues.validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, formik }) => (
                  <Form>
                    <FormAnt.Item>
                      <Field
                        as={Input}
                        name="email"
                        size="large"
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        className="form-field"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </FormAnt.Item>
                    <FormAnt.Item>
                      <Field
                        as={Input.Password}
                        name="password"
                        size="large"
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                        className="form-field"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-message"
                      />
                    </FormAnt.Item>
                    <FormAnt.Item>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        className="form-field"
                      >
                        Đăng nhập
                      </Button>
                    </FormAnt.Item>
                    <p>
                      Quên mật khẩu ?{" "}
                      <Link to="/quen-mat-khau">Lấy lại mật khẩu</Link>{" "}
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default LoginPage;
