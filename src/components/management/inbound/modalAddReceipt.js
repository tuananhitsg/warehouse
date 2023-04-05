import React, { useEffect, useState } from "react";
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

import goodsApi from "../../../api/goodsApi";
import categoryApi from "../../../api/categoryApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

import AddressField from "../../addressField/addressField";

const ModalAddReceipt = ({ showModalAddReceipt, setShowModalAddReceipt }) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [form] = Form.useForm();
  const [size, setSize] = useState("");
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [categoryCode, setCategoryCode] = useState("");
  const [goods, setGoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeSize = async (values) => {
    console.log("values", values);
    setSize(values);
  };
  const onChageCategory = (value) => {
    setCategoryCode(value);
  };
  const onClose = () => {
    setShowModalAddReceipt(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getCategories();
        const codes = res.map((category) => category.code);
        console.log("categoryCodes", codes);
        setCategoryCodes(codes);
        setCategories(res);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    const fetchGoods = async () => {
      try {
        const res = await goodsApi.getGoods();
        if (res) {
          setGoods(res);
        }
      } catch (error) {
        console.log("Error fetching goods: ", error);
      }
    };
    fetchCategories();
    fetchGoods();
  }, []);

  const handleSubmit = async (values) => {
    console.log("submit", values);
    console.log("reload", reload);
    const { categoryCode, name, size } = values;

    let length;
    let width;
    let height;
    if (size === "1") {
      length = 0.3;
      width = 0.2;
      height = 0.3;
    } else if (size === "2") {
      length = 0.5;
      width = 0.3;
      height = 0.4;
    } else if (size === "3") {
      length = 0.6;
      width = 0.4;
      height = 0.4;
    }
    const data = new FormData();
    data.append("categoryCode", categoryCode ? categoryCode : "");
    data.append("name", name ? name : "");
    data.append("length", length ? length : "");
    data.append("width", width ? width : "");
    data.append("height", height ? height : "");

    try {
      const res = await goodsApi.addGoods(data);
      console.log(res);
      if (res) {
        onClose();
        dispatch(setReload(!reload));
        form.resetFields();
        setTimeout(() => {
          message.success("Thêm sản phẩm thành công!");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Drawer
        title="Tạo hoá đơn nhập"
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
              <Form.Item name="goodsRequests">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="name" label="Tên sản phẩm">
                      <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="categoryCode" label="Loại sản phẩm">
                      <Select
                        placeholder="Chọn loại sản phẩm"
                        onChange={onChageCategory}
                        options={categories.map((category) => ({
                          value: category.code,
                          label: category.name,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="quantity" label="Số lượng">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="unit" label="Đơn vị">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="length" label="Chiều dài">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="width" label="Chiều rộng">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="height" label="Chiều cao">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={3}>Đối tác: </Col>
            <Col span={21}>
              <Form.Item name="partnerRequest">
                <AddressField />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModalAddReceipt;
