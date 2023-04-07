import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";

import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

import goodsApi from "../../../api/goodsApi";
import outboundApi from "../../../api/outboundApi";
import inboundApi from "../../../api/inboundApi";
import categoryApi from "../../../api/categoryApi";

const ModalAddReceipt = ({ showModalAddReceipt, setShowModalAddReceipt }) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [form] = Form.useForm();

  const [goods, setGoods] = useState([]);

 
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onClose = () => {
    setShowModalAddReceipt(false);
  };
  const handleSubmit = async (values) => {
    
  };

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const res = await goodsApi.getGoods();
        console.log("goods", res);
        setGoods(res);
      } catch (error) {
        console.log("Error fetching goods: ", error);
      }
    }
    fetchGoods();
  }, []);
  return (
    <>
      <Modal
        title="Tạo hoá đơn xuất"
        width={960}
        onCancel={onClose}
        open={showModalAddReceipt}
        // bodyStyle={{
        //   paddingBottom: 80,
        // }}
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
          <Row>
            <Col span={3}>Sản phẩm: </Col>
            <Col span={21}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="categoryCode" label="Tên sản phẩm">
                    <Select
                      placeholder="Chọn  sản phẩm"
                      //onChange={onChageCategory}
                      options={goods.map((good) => ({
                        value: good.code,
                        label: good.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="quantity" label="Số lượng">
                    <Input placeholder="Nhập số lượng" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="unit" label="Đơn vị">
                    <Select />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="warehouse"
                    label="Kích cỡ"
                    rules={[{ required: true }]}
                  >
                    <Space.Compact block>
                      <Form.Item name="length" noStyle>
                        <Input
                          style={{ width: "33%" }}
                          placeholder="Chiều dài (m)"
                        />
                      </Form.Item>
                      <Form.Item name="width" noStyle>
                        <Input
                          style={{ width: "33%" }}
                          placeholder="Chiều rộng (m)"
                        />
                      </Form.Item>
                      <Form.Item name="height" noStyle>
                        <Input
                          style={{ width: "33%" }}
                          placeholder="Chiều cao (m)"
                        />
                      </Form.Item>
                    </Space.Compact>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={3}>Đối tác: </Col>
            <Col span={21}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="partnerName" label="Tên đối tác">
                    <Input placeholder="Nhập tên đối tác" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="partnerPhone" label="Số điện thoại">
                    <Select placeholder="Chọn số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="reason">
                    <Input.TextArea
                      style={{
                        width: "100%",
                      }}
                      placeholder="Ghi chú"
                      rows={3}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddReceipt;
