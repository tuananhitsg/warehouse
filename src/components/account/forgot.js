import {
    MailOutlined, LockOutlined
} from '@ant-design/icons'
import { Button, Col, Row, Checkbox, Form, Input, message } from 'antd'
import { Typography } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { valid, validEmail } from '../../resources/regexp'
import './style.scss'
const { Title } = Typography;


const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [fieldValue, setFieldvalue] = useState([]);
    const navigate = useNavigate();
    const [loadings, setLoadings] = useState([]);

    const mailRef = useRef()
    const [sentOtp, setSentOtp] = useState({ value: false })

    const onValuesChange = (value) => {
        form.setFieldsValue(value)
    }

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
    }

    const sendOtp = async () => {
        enterLoading(0)
        if (!validEmail.test(form.getFieldValue('mail'))) {
            message.error('Email không hợp lệ');
            stopLoading(0);
            mailRef.current.focus();
            // form.getFieldValue('phone').;
            return;
        }
        const params = {
            mail: form.getFieldValue('mail'),
        };
        try {
            //const response = await accountApi.forgot_password(params);
            // if (response.data.code == 1) {
            //     message.success("Đã gửi link đổi mật khẩu ở mail " + form.getFieldValue('mail'));
            //     setSentOtp({ value: true })
            //     mailRef.current.focus()
            // } else {
            //     message.error("Số điện thoại không chính xác")
            // }
        } catch (error) {
            console.log('Failed:', error);
            message.error("Số điện thoại không chính xác")
        } finally {
            stopLoading(0)
        }
    }

    useEffect(() => {
        if (sentOtp.value == true) {
            mailRef.current.focus()
        }
    }, []);

    useEffect(() => {
        document.title = "Quên mật khẩu - Quản lý kho hàng thông minh"
    }, [])

    const onFinish = async (values) => {
        enterLoading(1)
        const params = {
            mail: values.mail,
        };
        try {
            //const response = await accountApi.forgot_password_verify(params);
            // console.log(response)
            // if (response.data.code == 1) {
            //     message.success("Mật khẩu mới sẽ được gửi tới mail " + values.mail + ", vui lòng đổi mật khẩu ngay.");
            //     setTimeout(() => {
            //         navigate('/login');
            //     }, 3000)
            // }
        } catch (error) {
            console.log('Failed:', error);
            message.error("Mail không chính xác")
        } finally {
            stopLoading(1)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error("Lỗi")
    };

    return (
        <>
            <div style={{
                backgroundImage: `url(${require("../../assets/bg.jpg")})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'absolute',
                top: '0',
                left: '0',
                height: '100vh',
                width: '100vw',
                filter: 'brightness(0.5)'
            }}>
            </div>
            <Row justify="space-around" align="middle" style={{
                height: '100vh'
            }}>
                <Col span={8} xs={18} sm={14} md={10} lg={8} style={{}}>
                    <div className='logo-container'>
                        <img style={{
                            width: '150px'
                        }} src={require('../../assets/logo.png')}></img>
                        <Title className='logo-text' level={2} style={{
                            color: 'white'
                        }}>Kho hàng thông minh</Title>
                    </div>
                </Col>
                <Col span={8} xs={18} sm={14} md={10} lg={8} style={{ backgroundColor: "white", padding: "50px", borderRadius: "10px" }}>
                    <Title className='form-title' level={2} style={{ marginBottom: '20px' }}>
                        Quên mật khẩu
                    </Title>
                    <Form className='login-form'
                        form={form}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                         onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                        onValuesChange={onValuesChange}
                    >
                        <Row>
                            <Col flex="auto">
                                <Form.Item
                                    name="mail"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email!',
                                        },
                                    ]}
                                >
                                    <Input
                                        size='large'
                                        ref={mailRef}
                                        prefix={<MailOutlined className="site-form-item-icon" />}
                                        placeholder="Email"
                                        onChan />
                                </Form.Item>
                            </Col>
                            {/* <Col flex="none">
                                <Form.Item>
                                    <Button type="primary" htmlType="button" size='large' loading={loadings[0]} onClick={() => sendOtp()}>
                                        Nhận email
                                    </Button>

                                </Form.Item>
                            </Col> */}
                        </Row>
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
                            //style={{ display: sentOtp.value ? 'block' : 'none' }}
                        >
                            <Button
                                 type="primary" htmlType="submit" loading={loadings[1]} size='large'
                            >
                                Lấy lại mật khẩu
                            </Button>
                        </Form.Item>
                        <p><Link to="/dang-nhap">Đăng nhập ngay</Link> </p>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default ForgotPassword;