import "../../utils/formError.scss";
import React, { useState, useEffect } from "react";
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
import partnerApi from "../../../api/partnerApi";
import addressApi from "../../../api/addressApi";

import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Field, ErrorMessage } from "formik";
import { createPartnerValues } from "../../utils/initValues";

const ModalPartnerDetail = ({
  showModalPartnerDetail,
  setShowModalPartnerDetail,
  selectedId,
}) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);

  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(null);
  const [districtPicked, setDistrictPicked] = useState(null);
  const [wardPicked, setWardPicked] = useState(null);
  const [provinceGot, setProvinceGot] = useState("");
  const [districtGot, setDistrictGot] = useState("");
  const [wardGot, setWardGot] = useState("");

  const [initialValues, setInitialValues] = useState(null);

  const onClose = () => {
    setShowModalPartnerDetail(false);
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { street, province, district, ward, phone, name } = values;
    console.log("values:", values);
    const data = {
      address: {
        street: street,
        province: province,
        district: district,
        ward: ward,
      },
      phone: phone,
      name: name,
    };
    console.log("formdata:", data);

    const res = await partnerApi.update(data);
    console.log(res);
    if (res.code) {
      resetForm();
      dispatch(setReload(!reload));
      setSubmitting(false);
      setProvincePicked(null);
      setDistrictPicked(null);
      setWardPicked(null);
    }
  };
  useEffect(() => {
    console.log("selectedId", selectedId);
    const fetchData = async (id) => {
      try {
        const res = await partnerApi.getById(id);
        if (res) {
          console.log("res:", res);
          setInitialValues(res);
          setProvincePicked(res.address.province);
          setDistrictPicked(res.address.district);
          setWardPicked(res.address.ward);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData(selectedId);
  }, []);
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className="modal-container">
      <div className="modal-header">
        <Drawer
          title="Chi tiết đối tác"
          width={640}
          onClose={onClose}
          open={showModalPartnerDetail}
        >
          <div className="modal-add-partner">
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={createPartnerValues.validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, handleSubmit, setFieldValue, resetForm }) => (
                <FormAntd
                  layout="horizontal"
                  labelAlign="left"
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 19,
                  }}
                >
                  <FormAntd.Item label="Tên đối tác" labelAlign="left">
                    <Field
                      name="name"
                      as={Input}
                      placeholder="Nhập tên đối tác"
                      className="form-field"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </FormAntd.Item>
                  <FormAntd.Item label="Số điện thoại" labelAlign="left">
                    <Field
                      name="phone"
                      as={Input}
                      placeholder="Nhập số điện thoại"
                      className="form-field"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-message"
                    />
                  </FormAntd.Item>
                  <FormAntd.Item label="Địa chỉ" labelAlign="left">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Field
                          name="province"
                          as={Select}
                          value={provincePicked}
                          showSearch
                          placeholder="Chọn tỉnh thành"
                          optionFilterProp="children"
                          onChange={(value, option) => {
                            onChangeProvince(value, option);
                            setFieldValue("province", option.label);
                          }}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={province}
                        />
                      </Col>
                      <Col span={8}>
                        <Field
                          name="district"
                          as={Select}
                          showSearch
                          placeholder="Chọn quận huyện"
                          value={districtPicked}
                          optionFilterProp="children"
                          onChange={(value, option) => {
                            onChangeDistrict(value, option);
                            setFieldValue("district", option.label);
                          }}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={districts}
                        />
                      </Col>
                      <Col span={8}>
                        <Field
                          name="ward"
                          as={Select}
                          showSearch
                          value={wardPicked}
                          placeholder="Chọn phường xã"
                          optionFilterProp="children"
                          onChange={(value, option) => {
                            onChangeWard(value, option);
                            setFieldValue("ward", option.label);
                          }}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={wards}
                        />
                      </Col>
                      <Col span={8}>
                        <ErrorMessage
                          name="province"
                          component="div"
                          className="error-message"
                        />
                      </Col>
                      <Col span={8}>
                        <ErrorMessage
                          name="district"
                          component="div"
                          className="error-message"
                        />
                      </Col>
                      <Col span={8}>
                        <ErrorMessage
                          name="ward"
                          component="div"
                          className="error-message"
                        />
                      </Col>
                    </Row>
                  </FormAntd.Item>
                  <FormAntd.Item label="Địa chỉ cụ thể" labelAlign="left">
                    <Field
                      name="address.street"
                      as={Input.TextArea}
                      placeholder="Nhập địa chỉ cụ thể"
                      className="form-field"
                      maxLength={100}
                      autoSize={{ minRows: 3 }}
                      showCount
                      style={{ resize: "none" }}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error-message"
                    />
                  </FormAntd.Item>
                  <div
                    className="btn-add-partner"
                    style={{ marginTop: "50px" }}
                  >
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
                            onClick={() => handleSubmit()}
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
        </Drawer>
      </div>
      {/* <Form
            form={form}
            id="myForm"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="code" label="Mã đối tác">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="name" label="Tên đối tác">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Col span={12}>
              <Form.Item name="phone" label="Số điện thoại">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Địa chỉ" name="province">
                  <Select
                    showSearch
                    placeholder="Chọn tỉnh thành"
                    optionFilterProp="children"
                    //onChange={onChangeProvince}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    //options={province}
                  />
                </Form.Item>
              </Col> */}

      {/* <Col span={8}>
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
              </Col> */}
      {/* </Row>
          </Form> */}
    </div>
  );
};
export default ModalPartnerDetail;
