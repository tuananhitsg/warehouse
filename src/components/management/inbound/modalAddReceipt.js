

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
//import Api here
import addressApi from "../../../api/addressApi";
import inboundApi from "../../../api/inboundApi";
import categoryApi from "../../../api/categoryApi";
import goodsApi from "../../../api/goodsApi";
import partnerApi from "../../../api/partnerApi";

const ModalAddReceipt = ({ showModalAddReceipt, setShowModalAddReceipt }) => {
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

  const [categoryCodes, setCategoryCodes] = useState([]);
  const [categoryCode, setCategoryCode] = useState("");
  const [categories, setCategories] = useState([]);
  const [goods, setGoods] = useState([]);
  const [good, setGood] = useState("");
  const [selectedGood, setSelectedGood] = useState(null);

  useEffect(() => {
    fetchCategoriesAndGoods();
  }, [categoryCode]);

  const fetchCategoriesAndGoods = async () => {
    try {
      const [categoryRes, goodsRes] = await Promise.all([
        categoryApi.getCategories(),
        categoryCode !== ""
          ? goodsApi.getGoodsByCategory(categoryCode)
          : Promise.resolve([]),
      ]);
      const codes = categoryRes.map((category) => category.code);
      setCategoryCodes(codes);
      setCategories(categoryRes);
      setGoods(goodsRes);
      console.log("goodsres", goodsRes);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const onChageCategory = (value) => {
    setCategoryCode(value);
  };
  //goods

  const onChangeGoods = (value) => {
    setGood(value);
    const good = goods.find((good) => good.name === value);
    console.log("good", good);
    setSelectedGood(good);
    console.log("selected good", selectedGood);
  };
  useEffect(() => {
    if (selectedGood) {
      form.setFieldsValue({ ...selectedGood });
    }
  }, [onChangeGoods]);

  useEffect(() => {
    fetchProvince();
    if (provincePicked !== 0) {
      fetchDistrict(provincePicked);
    }
    if (districtPicked !== 0) {
      fetchWard(districtPicked);
    }
  }, [provincePicked, districtPicked]);
  const fetchProvince = async () => {
    try {
      const response = await addressApi.getList("/p");
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
  const onClose = () => {
    setShowModalAddReceipt(false);
  };
  const handleSubmit = async (values) => {
    const volume = values.length * values.width * values.height;
    const roundedNumber = Number(volume.toFixed(3));
    console.log("volume:", roundedNumber);
    const {
      categoryCode,
      height,
      length,
      name,
      quantity,
      unit,
      width,
      partnerName,
      phone,
      address,
      ward,
      district,
      province,
    } = values;
    const data = {
      goodsRequests: [
        {
          volume: roundedNumber,
          categoryCode: categoryCode,
          name: name,
          quantity: quantity,
          unit: unit,
          height: height,
          length: length,
          width: width,
        }
      ],
      partnerRequest: {
        address: `${address}, ${ward}, ${district}, ${province}`,
        name: partnerName,
        phone: phone,
      }
    };
    console.log("data:", data);
    try {
      const res = await inboundApi.createReceipt(data);
      console.log("res:", res);
      if (res) {
        dispatch(setReload(!reload));
        onClose();
        form.resetFields();
        setTimeout(() => {
          message.success("Tạo phiếu nhập thành công!");
        }, 3000);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
      <Modal
        title="Tạo hoá đơn nhập"
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
          <Row className="productForm">
            <Col span={3}>Sản phẩm: </Col>
            <Col span={21}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="categoryCode" label="Loại sản phẩm">
                    <Select
                      placeholder="Chọn loại sản phẩm"
                      options={categories.map((category) => ({
                        value: category.code,
                        label: category.name,
                      }))}
                      onChange={onChageCategory}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="name" label="Tên sản phẩm">
                    <Select
                      placeholder="Chọn sản phẩm"
                      options={goods.map((good) => ({
                        value: good.name,
                        label: good.name,
                        unit: good.unit,
                      }))}
                      onChange={onChangeGoods}
                      showSearch
                      optionFilterProp="children"
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="unit" label="Đơn vị">
                    <Input readOnly/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="quantity" label="Số lượng">
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="warehouse" label="Kích cỡ">
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
                  <Form.Item name="phone" label="Số điện thoại">
                    <Input placeholder="Nhập số điện thoại" />
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
                      placeholder="Nhập địa chỉ kho"
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
