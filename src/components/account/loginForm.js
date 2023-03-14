import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
    Typography,
    Button,
    Col,
    Row,
    Checkbox,
    Form,
    Input,
    message,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { validEmail, validPassword } from "../../resources/regexp";
import "./style.scss";
import { setUser } from "../../redux/userSlice";
import tokenService from "../../service/token.service";
const { Title } = Typography;

const error_msg = () => {
    message.error("Sai email hoặc mật khẩu");
};

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadings, setLoadings] = useState([]);
    const navigate = useNavigate();

    const distpatch = useDispatch();

    const handleLogin = async (e) => {
        const params = {
            email: email,
            password: password,
        };
        console.log(params);

        try {
            const res = await userApi.login(params);
            console.log(res);
            if (res) {
                navigate("/trang-chu");
                distpatch(setUser(res.data));
                
                //luu thông tin acessTonken vào localstorage
                tokenService.setUser(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div
                className="bg-container"
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
                    <img  src={require('../../assets/logo.png')}></img>
                        <Title className="logo-text"
                            level={2}
                            style={{
                                color: "white",
                                
                            }}
                        >
                            Kho hàng thông minh
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
                    <Title className="form-title" level={2}>
                        Đăng nhập
                    </Title>
                    <Form
                        
                        onFinish={handleLogin}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập gmail!",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                onChange={(e) => setEmail(e.target.value)}
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
                                placeholder="Email"
                                autoFocus
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                size="large"
                                loading={loadings[0]}
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <p>
                            Quên mật khẩu ?{" "}
                            <Link to="/quen-mat-khau">Lấy lại mật khẩu</Link>{" "}
                        </p>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default LoginForm;
