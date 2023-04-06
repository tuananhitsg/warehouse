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
    console.log("submit", values);
    console.log("reload", reload);
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
    console.log("bieens values:", values);
    const data = {
      name: name,
      length: length,
      width: width,
      height: height,
      lengthShelf: lengthShelf,
      widthShelf: widthShelf,
      heightShelf: heightShelf,
      numberOfFloor: numberOfFloor,
      lengthOfColumn: lengthOfColumn,

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
        setTimeout(() => {
          message.success("Thêm nhà kho thành công!");
        }, 3000);
      }
    } catch (error) {
      console.log("Loi roi:", error);
    }
  };

  return (
    <>
      <Modal
        title="Thông tin nhà kho"
        width={720}
        onCancel={onClose}
        open={showModalAddWareHouse}
        bodyStyle={{
          paddingBottom: 80,
        }}
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
                  <Form.Item name="lengthShelf" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều dài kệ(m)"
                    />
                  </Form.Item>
                  <Form.Item name="widthShelf" noStyle>
                    <Input
                      style={{ width: "33%" }}
                      placeholder="Chiều rộng kệ(m)"
                    />
                  </Form.Item>
                  <Form.Item name="heightShelf" noStyle>
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
            <Col span={12}>
              <Form.Item name="numberOfFloor" label="Số tầng của kệ">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lengthOfColumn" label="Chiều dài mỗi cột">
                <Input />
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
