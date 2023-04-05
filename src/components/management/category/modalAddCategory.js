import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";

import categoryApi from "../../../api/categoryApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "antd/es/modal/Modal";

const ModalAddCategory = ({
  showModalAddCategory,
  setShowModalAddCategory,
}) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [form] = Form.useForm();
  // const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setShowModalAddCategory(false);
  };

  const handleSubmit = async (params) => {
    console.log("submit", params);
    console.log("reload", reload);
    const { description, name } = params;
    console.log("name", name);

    const data = new FormData();
    data.append("description", description ? description : "");
    data.append("name", name ? name : "");

    try {
      const res = await categoryApi.addCategory(data);
      console.log(res);
      if (res) {
        onClose();
        dispatch(setReload(!reload));
        form.resetFields();
        setTimeout(() => {
          message.success("Thêm loại sản phẩm thành công!");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Thông tin loại sản phẩm"
        width={720}
        onCancel={onClose}
        open={showModalAddCategory}
        bodyStyle={{
          paddingBottom: 80,
        }}
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
            <Col span={24}>
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
    </>
  );
};
export default ModalAddCategory;
