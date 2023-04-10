import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Modal,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import employeeApi from "../../../api/employeeApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalAddEmployee = ({
  showModalAddEmployee,
  setShowModalAddEmployee,
}) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [form] = Form.useForm();
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeSex = (values) => {
    console.log("values", values);
    setSex(values);
  };
  const onChangeRole = (values) => {
    setRole(values);
  };

  const onClose = () => {
    setShowModalAddEmployee(false);
  };

  const handleSubmit = async (values) => {
    const { email, fullName, password, roles, sex } = values;

    const data = {
      email: email ? email : "",
      fullName: fullName ? fullName : "",
      password: password ? password : "Abc@1234",
      roles: roles ? roles.split() : [],
      sex: sex ? sex : "Nam",
    };
    console.log("formdata:", data);

    try {
      const res = await employeeApi.addEmployee(data);
      console.log(res);

      onClose();
      dispatch(setReload(!reload));
      form.resetFields();
      setTimeout(() => {
        message.success("Tạo nhân viên thành công!");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Thông tin nhân viên"
        width={720}
        onClose={onClose}
        onCancel={onClose}
        open={showModalAddEmployee}

        footer={
          <Space>
            <Button onClick={onClose}>Huỷ</Button>
            <Button form="myForm" htmlType="submit" type="primary">
              Xác nhận
            </Button>
          </Space>
        }
      >
        <Form form={form} onFinish={handleSubmit} id="myForm" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fullName" label="Tên nhân viên">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sex" label="Giới tính">
                <Select
                  onChange={onChangeSex}
                  options={[
                    {
                      value: "Nam",
                      label: "Nam",
                    },
                    {
                      value: "Nữ",
                      label: "Nữ",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="roles" label="Chức vụ">
                <Select
                  onChange={onChangeRole}
                  options={[
                    {
                      value: "admin",
                      label: "Quản lý",
                    },
                    {
                      value: "user",
                      label: "Nhân viên",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddEmployee;
