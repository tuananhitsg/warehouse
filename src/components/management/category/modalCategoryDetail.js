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
  }
  // useEffect(() => {
  //   console.log("selectedId", selectedId);
  //   const fetchData = async (id) => {
  //     try {
  //       const res = await categoryApi.getCategoryById(id);
  //       console.log("res", res);
  //       if (res.status === 200) {
  //         const { data } = res;
  //         setGoodsDetail(data);
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   fetchData(selectedId);
  // }, []);
  return (
    <div className="modal-container">
      <div className="modal-header">
        <Drawer
          title="Chi tiết loại sản phẩm"
          width={720}
          onClose={onClose}
          open={showModalCategoryDetail}
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
export default ModalCategoryDetail;
