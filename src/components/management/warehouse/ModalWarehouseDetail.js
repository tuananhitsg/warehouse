import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
const ModalWarehouseDetail = ({ visible, setVisible, selectedId, isAdmin }) => {
  const [form] = Form.useForm();
  const reload = useSelector((state) => state.reloadReducer.reload);

  const getWareHouseById = async (id) => {
    try {
      const res = await wareHouserApi.getWareHouseById(id);
      console.log("res: ", res);
      if (res) {
        form.setFieldsValue({
          ...res,
          province: res.location.province,
          district: res.location.district,
          ward: res.location.ward,
          address: res.location.address,
        });
      }
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  };
  useEffect(() => {
    if (selectedId) {
      getWareHouseById(selectedId);
    }
  }, [selectedId]);

  const handleSubmit = async (values) => {
    console.log("values: ", values);
  };
  const restrictInputToNumbers = (event) => {
    const numericKeys = /[0-9]/;
    if (!numericKeys.test(event.key)) {
      event.preventDefault();
    }
  };
  //fetch dia chi
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);
  const [wardPicked, setWardPicked] = useState(0);
  const [provinceGot, setProvinceGot] = useState("");
  const [districtGot, setDistrictGot] = useState("");
  const [wardGot, setWardGot] = useState("");

  useEffect(() => {
    fetchProvince();
    if (provincePicked !== 0) {
      //console.log("run");
      fetchDistrict(provincePicked);
    }
    if (districtPicked !== 0) {
      fetchWard(districtPicked);
    }
  }, [provincePicked, districtPicked]);
  const fetchProvince = async () => {
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
  const fetchDistrict = async (id) => {
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
  const fetchWard = async (id) => {
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
  return (
    <>
      <Drawer
        title="Thông tin kho"
        width={720}
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Form
          form={form}
          layout="vertical"
          id="form_in_modal"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="code" label="Mã kho">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Tên kho">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="warehouse"
                label="Kích cỡ kho"
                rules={[{ required: true }]}
              >
                <Space.Compact block>
                  <Form.Item name="length" noStyle>
                    <Input
                      disabled
                      style={{ width: "33%" }}
                      placeholder="Chiều dài kho(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                  <Form.Item name="width" noStyle>
                    <Input
                      disabled
                      style={{ width: "33%" }}
                      placeholder="Chiều rộng kho(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                  <Form.Item name="height" noStyle>
                    <Input
                      disabled
                      style={{ width: "33%" }}
                      placeholder="Chiều cao kho(m)"
                      onKeyPress={restrictInputToNumbers}
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="volume" label="Thể tích">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="acreage" label="Diện tích">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Địa chỉ" name="province">
                <Select
                  showSearch
                  disabled
                  placeholder="Tỉnh thành"
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
                  disabled
                  showSearch
                  placeholder="Quận huyện"
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
                  disabled
                  showSearch
                  placeholder="Phường/xã"
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
            <Col span={24}>
              <Form.Item name="address" label="Địa chỉ cụ thể">
                <Input.TextArea disabled placeholder="Địa chỉ cụ thể" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ModalWarehouseDetail;
