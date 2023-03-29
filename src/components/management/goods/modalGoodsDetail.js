import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import goodsApi from "../../../api/goodsApi";

const ModalGoodsDetail = ({
  showModalGoodsDetail,
  setShowModalGoodsDetail,
  selectedId,
}) => {
  const [form] = Form.useForm();
  const [size, setSize] = useState("");

  const onClose = () => {
    setShowModalGoodsDetail(false);
  };
  const handleSubmit = async (values) => {
    console.log("submit", values);
  };

  const onChangeSize = async (value) => {
    setSize(value);
  };

  // const convertSize = (value) => {
  //   if (value === "1") {
  //     return "0.3x0.2x0.3";
  //   } else if (value === "2") {
  //     return "0.5x0.3x0.4";
  //   } else if (value === "3") {
  //     return "0.6x0.4x0.4";
  //   } else {
  //     return value;
  //   }
  // }

  useEffect(() => {
    console.log("selectedId", selectedId);
    const fetchData = async (id) => {
      try {
        const res = await goodsApi.getGoodsById(id);
        console.log(res);
        if (res) {
          if (res.length === 0.3 && res.width === 0.2 && res.height === 0.3) {
            form.setFieldsValue({ size: "1" });
          } else if (
            res.length === 0.5 &&
            res.width === 0.3 &&
            res.height === 0.4
          ) {
            form.setFieldsValue({ size: "2" });
          } else if (
            res.length === 0.6 &&
            res.width === 0.4 &&
            res.height === 0.4
          ) {
            form.setFieldsValue({ size: "3" });
          } else {
            form.setFieldsValue({ ...res });
          }
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
          open={showModalGoodsDetail}
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
              <Col span={12}>
                <Form.Item name="size" label="Kích thước">
                  <Select
                    onChange={onChangeSize}
                    options={[
                      {
                        value: "1",
                        label: "0.3 X 0.2 X 0.3 (m)",
                      },
                      {
                        value: "2",
                        label: "0.5 X 0.3 X 0.4 (m)",
                      },
                      {
                        value: "3",
                        label: "0.6 X 0.4 X 0.4 (m)",
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
export default ModalGoodsDetail;
