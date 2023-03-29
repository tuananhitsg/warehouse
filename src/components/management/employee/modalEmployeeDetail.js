import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import employeeApi from "../../../api/employeeApi";

const ModalEmployeeDetail = ({
  showModalEmployeeDetail,
  setShowModalEmployeeDetail,
  selectedId,
}) => {
  const [form] = Form.useForm();
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const onChangeSex = (values) => {
    console.log("values", values);
    setSex(values);
  };
  const onChangeRole = (values) => {
    setRole(values);
  };
  const onClose = () => {
    setShowModalEmployeeDetail(false);
  };

  const convertRoleName = (roleName) => {
    if (roleName === "USER") {
      return "Nhân viên";
    } else if (roleName === "ADMIN") {
      return "Quản lý";
    } else {
      return roleName;
    }
  };

  const handleSubmit = async (values) => {
    const { fullName, sex, role} = values;
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("sex", sex);
    data.append("role", role);
    console.log("data", data);
    //loi api
    try{
      const res = await employeeApi.updateEmployee(selectedId, data);
      if(res){
        onClose();
        setTimeout(() => {
          message.success("Cập nhật thành công");
        },3000);
      }
    }catch(error){
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("selectedId", selectedId);
    const fetchData = async (id) => {
      try {
        const res = await employeeApi.getEmployeeById(id);
        if (res) {
          console.log("res:", res);

          form.setFieldsValue({
            ...res,
            roles: convertRoleName(res.roles[0].name),
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData(selectedId);
  }, []);
  return (
    <div className="modal-container">
      <div className="modal-header">
        <Modal
          title="Chi tiết sản phẩm"
          width={640}
          onCancel={onClose}
          open={showModalEmployeeDetail}
          footer={
            <Space>
              <Button onClick={onClose}>Huỷ</Button>
              <Button type="primary" form="myForm" htmlType="submit">
                Xác nhận
              </Button>
            </Space>
          }
        >
          <Form
            form={form}
            id="myForm"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="code" label="Mã nhân viên">
                  <Input disabled={true} />
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
                <Form.Item name="email" label="Email">
                  <Input disabled/>
                </Form.Item>
              </Col>
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
            </Row>
            <Row gutter={16}>
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
      </div>
    </div>
  );
};
export default ModalEmployeeDetail;
