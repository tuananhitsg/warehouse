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

const ModalAddGoods = ({ showModalAddGoods, setShowModalAddGoods }) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [form] = Form.useForm();
  const [size, setSize] = useState("");
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [categoryCode, setCategoryCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const onChangeSize = async (values) => {
    console.log("values", values);
    setSize(values);
  };
  const onChageCategory = (value) => {
    setCategoryCode(value);
  };
  const onClose = () => {
    setShowModalAddGoods(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getCategories();
        console.log("res", res);
        const codes = res.map((category) => category.code);
        console.log("categoryCodes", codes);
        setCategoryCodes(codes);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
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
        title="Thông tin sản phẩm"
        width={720}
        onClose={onClose}
        open={showModalAddGoods}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
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
            <Col span={12}>
              <Form.Item name="categoryCode" label="Mã loại sản phẩm">
                <Select
                  placeholder="Chọn mã"
                  onChange={onChageCategory}
                  options={categoryCodes.map((code) => ({
                    value: code,
                    label: code,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Tên sản phẩm">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
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
            {/* <Col span={8}>
              <Form.Item name="width" label="Chiều rộng">
                <Select
                  onChange={onChangeSize}
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
              <Form.Item name="height" label="Chiều cao">
                <Select
                  onChange={onChangeSize}
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
            </Col> */}
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModalAddGoods;
