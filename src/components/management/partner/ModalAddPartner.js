import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Modal,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import addressApi from "../../../api/addressApi";
import employeeApi from "../../../api/employeeApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";
import partnerApi from "../../../api/partnerApi";

const ModalAddPartner = ({ showModalAddPartner, setShowModalAddPartner }) => {
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

  const onClose = () => {
    setShowModalAddPartner(false);
  };

  const handleSubmit = async (values) => {
    const { address, name, phone} = values;

    const data = {
      address: `${address}, ${wardGot}, ${districtGot}, ${provinceGot}`,
      name: name,
      phone: phone,
    };
    console.log("formdata:", data);

    try {
      const res = await partnerApi.create(data);
      console.log(res);
      onClose();
      dispatch(setReload(!reload));
      form.resetFields();
      setTimeout(() => {
        message.success("Tạo đối tác thành công!");
      }, 500);
    } catch (error) {
      console.log(error);
      message.error("Tạo đối tác thất bại!");
    }
  };
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
      <Modal
        title="Thông tin đối tác"
        width={720}
        onClose={onClose}
        onCancel={onClose}
        open={showModalAddPartner}
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
            <Col span={12}>
              <Form.Item name="name" label="Tên đối tác">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Số điện thoại">
                <Input />
              </Form.Item>
            </Col>
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
                  showCount
                  maxLength={100}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nhập địa chỉ"
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
export default ModalAddPartner;
