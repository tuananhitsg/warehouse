import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import employeeApi from "../../../api/employeeApi";



const ModalEmployeeDetail = ({
  showModalEmployeeDetail,
  setShowModalEmployeeDetail,
  selectedId,
}) => {
  const [form] = Form.useForm();
  const [size, setSize] = useState("");

  const onClose = () => {
    setShowModalEmployeeDetail(false);
  };
  const handleSubmit = async (values) => {
    console.log("submit", values);
  };

  const onChangeSize = async (values) => {
    console.log("values", values);
    setSize(values);
  };

  useEffect(() => {
    console.log("selectedId", selectedId);
    const fetchData = async (id) => {
      try {
        const res = await employeeApi.getEmployeeById(id);
        if (res) {
          console.log("res:", res);
          form.setFieldsValue({ ...res });
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
        <Drawer
          title="Chi tiết sản phẩm"
          width={560}
          onClose={onClose}
          open={showModalEmployeeDetail}
          extra={
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
                <Form.Item name="code" label="Mã sản phẩm">
                  <Input disabled={true} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="name" label="Tên sản phẩm">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="categoryName" label="Loại sản phẩm">
                  <Select />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="unit" label="Đơn vị">
                  <Select />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="length" label="Chiều dài">
                  <Select onChange={onChangeSize} 
                    options={[
                      {
                      value: "1",
                      label: "1",
                    },
                    {
                      value: "2",
                      label: "2",
                    },
                    {
                      value: "3",
                      label: "3",
                    },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="width" label="Chiều rộng">
                  <Select onChange={onChangeSize} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="height" label="Chiều cao">
                  <Select onChange={onChangeSize} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};
export default ModalEmployeeDetail;
