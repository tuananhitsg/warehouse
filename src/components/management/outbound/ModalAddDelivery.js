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
import categoryApi from "../../../api/categoryApi";
import partnerApi from "../../../api/partnerApi";

const ModalAddReceipt = ({ showModalAddReceipt, setShowModalAddReceipt }) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [form] = Form.useForm();

  const [goods, setGoods] = useState([]);
  const [good, setGood] = useState("");
  const [partners, setPartners] = useState([]);
  const [partner, setPartner] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onClose = () => {
    setShowModalAddReceipt(false);
  };
  const onChangeGoods = (value) => {
    console.log(`selected ${value}`);
    setGood(value);
  };
  const onChangePartner = (value) => {
    console.log(`selected ${value}`);
    setPartner(value);
    const partnerTemp = partners.find((item) => item.code === value);
    setSelectedPartner(partnerTemp);
    console.log("partnerTemp", partnerTemp);
  };
  useEffect(() => {
    if (selectedPartner) {
      form.setFieldsValue({
        partnerPhone: selectedPartner.phone,
      });
    }
  }, [onChangePartner]);

  const handleSubmit = async (values) => {
    const { code, quantity, partnerPhone, reason } = values;
    console.log("values", values);
    const data = {
      email: "",
      goodsRequests: [
        {
          goodCode: code,
          quantity: quantity,
        },
      ],
      partnerPhone: partnerPhone,
      reason: reason,
    };
    console.log("data", data);
    try {
      const res = await outboundApi.createDelivery(data);
      console.log("res", res);
      if (res) {
        dispatch(setReload(!reload));
        onClose();
        form.resetFields();
        setTimeout(() => {
          message.success("Tạo phiếu xuất thành công");
        }, 3000);
      }
    } catch (error) {
      console.log("Error create delivery: ", error);
    }
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
    };
    fetchGoods();
    fetchPartner();
  }, []);
  const fetchPartner = async () => {
    try {
      const res = await partnerApi.getAll();
      if (res) {
        console.log("partner", res);
        const newRes = res.map((item) => {
          return {
            ...item,
            value: item.code,
            label: item.name,
          };
        });
        setPartners(newRes);
      }
    } catch (error) {
      console.log("Error fetching partner: ", error);
    }
  };

  return (
    <>
      <Modal
        title="Tạo hoá đơn xuất"
        width={960}
        onCancel={onClose}
        open={showModalAddReceipt}

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
                  <Form.Item name="code" label="Tên sản phẩm">
                    <Select
                      placeholder="Chọn sản phẩm"
                      onChange={onChangeGoods}
                      options={goods.map((good) => ({
                        value: good.code,
                        label: good.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="quantity" label="Số lượng">
                    <Input type="number" />
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
                    <Select
                      placeholder="Nhập tên đối tác"
                      options={partners}
                      onChange={onChangePartner}
                      onSearch={onSearch}
                      optionFilterProp="children"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="partnerPhone" label="Số điện thoại">
                    <Input placeholder="Chọn số điện thoại" readOnly />
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
                      showCount
                      maxLength={100}
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
