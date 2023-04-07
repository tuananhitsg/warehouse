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
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
//import Api here
import addressApi from "../../../api/addressApi";
import inboundApi from "../../../api/inboundApi";
import categoryApi from "../../../api/categoryApi";
import goodsApi from "../../../api/goodsApi";
import partnerApi from "../../../api/partnerApi";


const FormProduct = () => {
  const [form] = Form.useForm();
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

  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <Form form={form} layout="vertical" id="formProduct">
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
                <Input />
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
    </Form>
  );
};
export default FormProduct;
