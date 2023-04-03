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

import categoryApi from "../../../api/categoryApi";
import Modal from "antd/es/modal/Modal";

const { Option } = Select;
const ModalCategoryDetail = ({
  showModalCategoryDetail,
  setShowModalCategoryDetail,
  selectedId,
}) => {
  const [form] = Form.useForm();
  const onClose = () => {
    setShowModalCategoryDetail(false);
  };
  const handleSubmit = async (values) => {
    console.log("submit", values);
  };

  useEffect(() => {
    console.log("selectedId", selectedId);
    const fetchData = async (id) => {
      try {
        const res = await categoryApi.getCategoryById(id);
        console.log("res", res);
        if (res) {
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
        <Modal
          title="Chi tiết loại sản phẩm"
          width={720}
          onCancel={onClose}
          open={showModalCategoryDetail}
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
                  <Input disabled={true} name="code" label="Mã loại sản phẩm" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="name" label="Tên loại sản phẩm">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="Mô tả">
                  <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default ModalCategoryDetail;
