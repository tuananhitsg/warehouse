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

import goodsApi from "../../../api/goodsApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalAddGoods = ({ 
  showModalAddGoods, 
  setShowModalAddGoods 
}) => {
  const dispatch = useDispatch();
  const reload = useSelector(state=> state.reloadReducer.reload);
  const [form] = Form.useForm();
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onChangeSize = async (values) => {
    console.log("values", values);
    setSize(values);
  };

  const onClose = () => {
    setShowModalAddGoods(false);
  };

  const handleSubmit = async (values) => {
    console.log("submit", values);
    console.log("reload", reload);
    const { categoryCode, name, length, width, height } = values;
    console.log("name", name);

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
                  options={[
                    {
                      value: "L-104466",
                      label: "Đồ uống - L-104466",
                    },
                    {
                      value: "L-943843",
                      label: "Bánh kẹo - L-943843",
                    },
                  ]}
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
            <Col span={8}>
              <Form.Item name="length" label="Chiều dài">
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
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModalAddGoods;
