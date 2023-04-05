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

import wareHouserApi from "../../../api/wareHouseApi";
import addressApi from "../../../api/addressApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
const ModalAddWareHouse = ({
  showModalAddWareHouse,
  setShowModalAddWareHouse,
}) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [form] = Form.useForm();
  const [size, setSize] = useState("");
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [categoryCode, setCategoryCode] = useState("");

  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);
  const [wardPicked, setWardPicked] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const onChangeSize = async (values) => {
    console.log("values", values);
    setSize(values);
  };
  const onChageCategory = (value) => {
    setCategoryCode(value);
  };
  const onChangeProvince = (value) => {
    setProvincePicked(value);
    console.log("provincePicked:", provincePicked);
  };
  const onChangeDistrict = (value) => {
    setDistrictPicked(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onChangeWard = (value) => {
    setWardPicked(value);
  };
  const onClose = () => {
    setShowModalAddWareHouse(false);
  };
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await addressApi.getList("/p");

        //console.log(response);
        if (response) {
          const newResponse = response.map((val) => {
            return {
              value: val.code,
              label: val.name,
            };
          });
          setProvince(newResponse);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (provincePicked !== 0) {
      //console.log("run");
      const fetchConversations = async (id) => {
        try {
          const response = await addressApi.getList(`/p/${id}?depth=2`);

          console.log("province res:", response);
          if (response) {
            const { districts } = response;
            const newDistricts = districts.map((val) => {
              return {
                value: val.code,
                label: val.name,
              };
            });
            setDistricts(newDistricts);
          }
        } catch (error) {
          console.log("Failed to fetch conversation list: ", error);
        }
      };

      fetchConversations(provincePicked);
    }
  }, [provincePicked]);

  useEffect(() => {
    if (districtPicked !== 0) {
      const fetchConversations = async (id) => {
        try {
          const response = await addressApi.getList(`/d/${id}?depth=2`);

          console.log(response);
          if (response) {
            const { wards } = response;
            const newWards = wards.map((val) => {
              return {
                value: val.code,
                label: val.name,
              };
            });
            setWards(newWards);
          }
        } catch (error) {
          console.log("Failed to fetch conversation list: ", error);
        }
      };

      fetchConversations(districtPicked);
    }
  }, [districtPicked]);
  const handleSubmit = async (values) => {
    console.log("submit", values);
    console.log("reload", reload);
    const {
      name,
      length,
      width,
      height,
      lengthShelve,
      widthShelve,
      heightShelve,
      province,
      district,
      ward,
    } = values;
    console.log("bieens values:", values);
    const data = {
      name: name,
      length: length,
      width: width,
      height: height,
      lengthShelve: lengthShelve,
      widthShelve: widthShelve,
      heightShelve: heightShelve,
      location: {
        province: provincePicked,
        district: districtPicked,
        ward: wardPicked,
      },
    };
    console.log("data:", data);
    try {
      const res = await wareHouserApi.addWareHouse(data);
      console.log(res);
      if (res) {
        onClose();
        dispatch(setReload(!reload));
        form.resetFields();
        setTimeout(() => {
          message.success("Thêm nhà kho thành công!");
        }, 500);
      }
    } catch (error) {
      console.log("Loi roi:", error);
    }
  };

  return (
    <>
      <Drawer
        title="Thông tin nhà kho"
        width={720}
        onClose={onClose}
        open={showModalAddWareHouse}
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
            <Col span={24}>
              <Form.Item name="name" label="Tên nhà kho">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="warehouse"
                label="Kích cỡ kho"
                rules={[{ required: true }]}
              >
                <Space.Compact block>
                  <Form.Item name="length" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều dài kho(m)"
                    />
                  </Form.Item>
                  <Form.Item name="width" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều rộng kho(m)"
                    />
                  </Form.Item>
                  <Form.Item name="height" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều cao kho(m)"
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="shelves"
                label="Kích cỡ kệ"
                rules={[{ required: true }]}
              >
                <Space.Compact block>
                  <Form.Item name="lengthShelve" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều dài kệ(m)"
                    />
                  </Form.Item>
                  <Form.Item name="widthShelve" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều rộng kệ(m)"
                    />
                  </Form.Item>
                  <Form.Item name="heightShelve" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều cao kệ(m)"
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Địa chỉ" name="province">
                <Select
                  showSearch
                  placeholder="Chọn tỉnh thành"
                  optionFilterProp="children"
                  onChange={onChangeProvince}
                  onSearch={onSearch}
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={province}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label=" " name="district">
                <Select
                  showSearch0
                  placeholder="Chọn quận huyện"
                  optionFilterProp="children"
                  onChange={onChangeDistrict}
                  onSearch={onSearch}
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={districts}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" " name="ward">
                <Select
                  showSearch
                  placeholder="Chọn phường/xã"
                  optionFilterProp="children"
                  onChange={onChangeWard}
                  onSearch={onSearch}
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={wards}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="address">
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nhập địa chỉ kho"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModalAddWareHouse;
