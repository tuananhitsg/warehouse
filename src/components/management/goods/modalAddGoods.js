import "../../utils/formError.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form as FormAntd,
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
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FastField,
  useFormik,
} from "formik";
import * as Yup from "yup";

const ModalAddGoods = ({ showModalAddGoods, setShowModalAddGoods }) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);

  const [size, setSize] = useState("");
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [categoryCode, setCategoryCode] = useState("");
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
    setShowModalAddGoods(false);
  };
  const createGoodsValues = {
    initial: {
      categoryCode: "",
      name: "",
    },
    validationSchema: Yup.object().shape({
      categoryCode: Yup.string().oneOf(
        categoryCodes,
        "Vui lòng chọn loại sản phẩm!"
      ),
      name: Yup.string().required("Tên không được bỏ trống!"),
    }),
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
    fetchCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("submit", values);
    console.log("reload", reload);
    const { categoryCode, name, size } = values;

    let length, width, height;
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
    const data = {
      categoryCode,
      name,
      length,
      width,
      height,
      unit: "Thùng",
    };
    const res = await goodsApi.addGoods(data);
    if (res) {
      resetForm();
      dispatch(setReload(!reload));
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        title="Thông tin sản phẩm"
        width={720}
        onCancel={onClose}
        open={showModalAddGoods}
        footer={null}
      >
        <div className="modal-add-goods">
          <Formik
            initialValues={{
              ...createGoodsValues.initial,
            }}
            validationSchema={createGoodsValues.validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit, setFieldValue, resetForm }) => (
              <FormAntd
                layout="horizontal"
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <FormAntd.Item label="Loại sản phẩm" labelAlign="left">
                  <Field
                    name="categoryCode"
                    as={Select}
                    placeholder="Chọn loại sản phẩm"
                    onChange={(value) => setFieldValue("categoryCode", value)}
                    options={categories.map((category) => ({
                      value: category.code,
                      label: category.name,
                    }))}
                    className="form-field"
                  />
                  <ErrorMessage
                    name="categoryCode"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>

                <FormAntd.Item label="Tên sản phẩm" labelAlign="left">
                  <Field
                    name="name"
                    as={Input}
                    placeholder="Nhập tên sản phẩm"
                    className="form-field"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>

                <FormAntd.Item label="Kích thước" labelAlign="left">
                  <Field
                    onChange={(value) => setFieldValue("size", value)}
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
                    name="size"
                    as={Select}
                    placeholder="Chọn kích thước"
                    className="form-field"
                  />
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
                <div className="btn-add-partner" style={{ marginTop: "50px" }}>
                  <Row gutter={16} justify="end">
                    <Col>
                      <FormAntd.Item>
                        <Button onClick={onClose}>Huỷ</Button>
                      </FormAntd.Item>
                    </Col>
                    <Col>
                      <FormAntd.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isSubmitting}
                          // disabled={!dirty || !isValid}
                          onClick={handleSubmit}
                        >
                          Xác nhận
                        </Button>
                      </FormAntd.Item>
                    </Col>
                  </Row>
                </div>
              </FormAntd>
            )}
          </Formik>
        </div>
        {/* <Form onFinish={handleSubmit} id="myForm" layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="categoryCode" label="Loại sản phẩm">
                <Select
                  placeholder="Chọn loại sản phẩm"
                  onChange={onChageCategory}
                  // options={categoryCodes.map((code) => ({
                  //   value: code,
                  //   label: code,
                  // }))}
                  options={categories.map((category) => ({
                    value: category.code,
                    label: category.name,
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
          </Row>
        </Form> */}
      </Modal>
    </>
  );
};
export default ModalAddGoods;
