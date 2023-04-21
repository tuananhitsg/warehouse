import "../../utils/formError.scss";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Form as FormAntd, Input, Row, Select } from "antd";

import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

import partnerApi from "../../../api/partnerApi";
import addressApi from "../../../api/addressApi";

import { Formik, Field, ErrorMessage } from "formik";
import { createPartnerValues } from "../../utils/initValues";

const ModalAddPartner = ({ showModalAddPartner, setShowModalAddPartner }) => {
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

  const onClose = () => {
    setShowModalAddPartner(false);
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

    const res = await partnerApi.create(data);
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
        footer={null}
      >
        <div className="modal-add-partner">
          <Formik
            initialValues={{ ...createPartnerValues.initial }}
            validationSchema={createPartnerValues.validationSchema}
            onSubmit={handleSubmit}
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
                    name="street"
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
      </Modal>
    </>
  );
};
export default ModalAddPartner;
