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

const { Option } = Select;

const ModalGoodsDetail = ({
  showModalGoodsDetail,
  setShowModalGoodsDetail,
  selectedId,
}) => {
  const [form] = Form.useForm();
  const onClose = () => {
    setShowModalGoodsDetail(false);
  };
  const handleSubmit = async (values) => {
    console.log("submit", values);
  }
  useEffect(() => {
    // console.log("selectedId", selectedId);
    // const fetchGoodsDetail = async (id) => {
    //   try {
    //     const res = await goodsApi.getGoodsDetail(id);
    //     console.log("res", res);
    //     if (res.status === 200) {
    //       const { data } = res;
    //       setGoodsDetail(data);
    //     }
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // }
  }, []);
  return (
    <div className="modal-container">
      <div className="modal-header">
        <Drawer
          title="Chi tiết sản phẩm"
          width={720}
          onClose={onClose}
          open={showModalGoodsDetail}
          extra={
            <Space>
              <Button onClick={onClose}>Huỷ</Button>
              <Button type="primary" form="myForm" htmlType="submit">Thêm</Button>
            </Space>
          }
        >
          <Form form={form} id="myForm" layout="vertical" onFinish={handleSubmit}>
          
          </Form>
        </Drawer>
      </div>
    </div>
  );
};
export default ModalGoodsDetail;
