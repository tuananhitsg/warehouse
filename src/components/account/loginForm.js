import {
  MailOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Button,
  Col,
  Row,
  Checkbox,
  Input,
  message,
  Divider,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { validEmail, validPassword } from "../../resources/regexp";
import { setUser } from "../../redux/userSlice";
import authService from "../../service/auth.service";
import { loginValues } from "./initValues";
import { FastField, Form, Formik } from "formik";
import InputField from "../../custom/InputField";
import * as Yup from "yup";

import "./index.scss";

const { Title, Text } = Typography;

const error_msg = () => {
  message.error("Sai email hoặc mật khẩu");
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadings, setLoadings] = useState([]);
  const navigate = useNavigate();
  const distpatch = useDispatch();

  const handleLogin = async () => {
    // const params = {
    //   email: email,
    //   password: password,
    // };
    // console.log(params);
    const values = { email: email, password: password };

    const login = async () => {
      try {
        const res = await userApi.login(values);
        console.log("token header:", res.token);
        if (res) {
          localStorage.setItem("token", res.token);
          authService.setUser(res);
          navigate("/trang-chu");
          distpatch(setUser(res));
        }
      } catch (err) {
        console.log(err);
      }
    };
    login(values);
  };

  return (
    <div className="form-container">
      <div id="account_page"></div>
      <div className="account-common-page">
        <div className="account-wrapper">
          <div className="account_right">
            <Title level={2} style={{ textAlign: "center" }}>
              <Text style={{ color: "#a64bf4" }}>Đăng Nhập</Text>
            </Title>
            <Divider>
              <div className="form-account">
                <Formik initialValues={{ ...loginValues.initial }}>
                  {(formikProps) => {
                    return (
                      <Form
                        initialValues={{
                          remember: true,
                        }}
                      >
                        <Row gutter={[0, 8]}>
                          <Col span={24}>
                            <FastField
                              name="email"
                              component={InputField}
                              type="text"
                              title="Tài khoản"
                              placeholder="Nhập tài khoản"
                              maxLength={50}
                              titleCol={24}
                              inputCol={24}
                            />
                          </Col>

                          <Col span={24}>
                            <FastField
                              name="password"
                              component={InputField}
                              type="password"
                              title="Mật khẩu"
                              placeholder="Nhập mật khẩu"
                              maxLength={200}
                              titleCol={24}
                              inputCol={24}
                            />
                          </Col>

                          <Col span={24}>
                            <br />
                            <Button type="primary" htmlType="submit" block>
                              Đăng nhập
                            </Button>
                            {/* <div className="button-container">
                            <button className="button-custom" type="submit">
                              Xác nhận
                            </button>
                          </div> */}
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </Divider>
            <div className="addtional-link">
              <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
