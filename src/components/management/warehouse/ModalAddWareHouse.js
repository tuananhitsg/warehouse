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

  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);
  const [wardPicked, setWardPicked] = useState(0);
  const [provinceGot, setProvinceGot] = useState("");
  const [districtGot, setDistrictGot] = useState("");
  const [wardGot, setWardGot] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
              label: val.name,
              value: val.code,
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
  const onChangeProvince = (value, option) => {
    console.log(`selected ${value}, ${option.label}`);
    setProvincePicked(value);
    setProvinceGot(option.label);
  };
  const onChangeDistrict = (value, options) => {
    console.log(`selected ${value}`);
    setDistrictPicked(value);
    setDistrictGot(options.label);
  };
  const onChangeWard = (value, options) => {
    console.log(`selected ${value}`);
    setWardPicked(value);
    setWardGot(options.label);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const handleSubmit = async (values) => {
    console.log("leghth:", form.getFieldValue("length"));
    console.log("submit", values);
    const {
      name,
      length,
      width,
      height,
      lengthShelf,
      widthShelf,
      heightShelf,
      province,
      district,
      ward,
      address,
      numberOfFloor,
      lengthOfColumn,
    } = values;
    const data = {
      name: name,
      length: parseInt(length, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      lengthShelf: parseInt(lengthShelf, 10),
      widthShelf: parseInt(widthShelf, 10),
      heightShelf: parseInt(heightShelf, 10),
      numberOfFloor: parseInt(numberOfFloor, 10),
      lengthOfColumn: parseInt(lengthOfColumn, 10),

      location: {
        province: provinceGot,
        district: districtGot,
        ward: wardGot,
        address: address,
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
        message.success("Tạo nhà kho thành công!");
      }
    } catch (error) {
      message.error("Tạo nhà kho thất bại!");
      console.log("Loi roi:", error);
    }
  };
  const restrictInputToNumbers = (event) => {
    const numericKeys = /[0-9]/;
    if (!numericKeys.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <Modal
        title="Thông tin nhà kho"
        width={720}
        onCancel={onClose}
        open={showModalAddWareHouse}
        footer={
          <Space>
            <Button onClick={onClose}>Huỷ</Button>
            <Button form="myForm" htmlType="submit" type="primary">
              Xác nhận
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={(errorInfo) => {
            console.error(errorInfo);
            message.error("Vui lòng điền đầy đủ thông tin và kiểm tra lại");
          }}
          id="myForm"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên nhà kho"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                //name="warehouse"
                label="Kích cỡ kho"
                rules={[{ required: true }]}
              >
                <Space.Compact block>
                  <Form.Item name="length" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều dài kho(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                  <Form.Item name="width" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều rộng kho(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                  <Form.Item name="height" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều cao kho(m)"
                      onKeyPress={restrictInputToNumbers}
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
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space.Compact block>
                  <Form.Item
                    name="lengthShelf"
                    noStyle
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, values) {
                          const lengthShelf = parseInt(values, 10);
                          const length = parseInt(getFieldValue("length"), 10);
                          if (lengthShelf +10 > length ) {
                            return Promise.reject(
                              new Error(
                                "Chiều dài kệ nhỏ hơn chiều dài kho ít nhất 10m"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều dài kệ(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                  <Form.Item
                    name="widthShelf"
                    noStyle
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, values) {
                          const widthShelf = parseInt(values, 10);
                          const width = parseInt(getFieldValue("width"), 10);
                          if (widthShelf +2 > width) {
                            return Promise.reject(
                              new Error(
                                "Chiều rộng kệ nhỏ hơn chiều rộng kho ít nhất 2m"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều rộng kệ(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                  <Form.Item
                    name="heightShelf"
                    noStyle
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, values) {
                          const heightShelf = parseInt(values, 10);
                          const height = parseInt(getFieldValue("height"), 10);
                          if (heightShelf + 5 > height ) {
                            return Promise.reject(
                              new Error(
                                "Chiều cao kệ nhỏ hơn chiều cao kho ít nhất 5m"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều cao kệ(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numberOfFloor"
                label="Số tầng của kệ"
                rules={[{ required: true }]}
              >
                <Input onKeyPress={restrictInputToNumbers} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lengthOfColumn"
                label="Chiều dài mỗi cột"
                rules={[{ required: true }]}
              >
                <Input onKeyPress={restrictInputToNumbers} />
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
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeProvince}
                  onSearch={onSearch}
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
                  showSearch
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
                <Input.TextArea
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nhập địa chỉ kho"
                  rows={3}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddWareHouse;
