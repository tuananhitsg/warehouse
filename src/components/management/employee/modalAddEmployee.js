import "../../utils/formError.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Modal,
  Form as FormAntd,
  Input,
  message,
  Row,
  Select,
  Space,
  Radio,
} from "antd";
import employeeApi from "../../../api/employeeApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import { createEmployeeValues } from "../../utils/initValues";

const ModalAddEmployee = ({
  showModalAddEmployee,
  setShowModalAddEmployee,
}) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeSex = (values) => {
    console.log("values", values.target.value);
    setSex(values.target.value);
  };
  const onChangeRole = (values) => {
    console.log("values", values);
    setRole(values);
    console.log("role", role);
  };

  const onClose = () => {
    setShowModalAddEmployee(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = {
      ...values,
    };
    console.log("data", data);

    const res = await employeeApi.addEmployee(data);
    console.log("res", res);
    if (res.code) {
      resetForm();
      dispatch(setReload(!reload));
      setRole("");
      setSex("");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        title="Thông tin nhân viên"
        width={720}
        onClose={onClose}
        onCancel={onClose}
        open={showModalAddEmployee}
        footer={null}
      >
        <div className="modal-add-employee">
          <Formik
            initialValues={{
              ...createEmployeeValues.initial,
            }}
            validationSchema={createEmployeeValues.validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              isSubmitting,
              dirty,
              isValid,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
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
                <FormAntd.Item labelAlign="left" label="Email">
                  <Field
                    as={Input}
                    name="email"
                    placeholder="Nhập email"
                    className="form-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
                <FormAntd.Item labelAlign="left" label="Mật khẩu">
                  <Field
                    as={Input.Password}
                    name="password"
                    placeholder="Nhập mật khẩu"
                    className="form-field"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
                <FormAntd.Item labelAlign="left" label="Xác nhận mật khẩu">
                  <Field
                    as={Input.Password}
                    name="passwordconfirm"
                    placeholder="Nhập lại mật khẩu"
                    className="form-field"
                  />
                  <ErrorMessage
                    name="passwordconfirm"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
                <FormAntd.Item labelAlign="left" label="Họ và tên">
                  <Field
                    as={Input}
                    name="fullName"
                    placeholder="Nhập họ và tên"
                    className="form-field"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
                <FormAntd.Item labelAlign="left" label="Chức vụ">
                  <Field
                    as={Select}
                    name="role"
                    className="form-field"
                    value={role}
                    options={[
                      {
                        value: "ADMIN",
                        label: "Quản lý",
                      },
                      {
                        value: "USER",
                        label: "Nhân viên",
                      },
                    ]}
                    onChange={(value) => {
                      setFieldValue("role", value);
                      setRole(value);
                    }}
                  />
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
                <FormAntd.Item
                  labelAlign="left"
                  label="Giới tính"
                  className="form-field"
                >
                  <Field
                    as={Radio.Group}
                    value={sex}
                    onChange={(values) => {
                      setFieldValue("sex", values.target.value);
                      setSex(values.target.value);
                    }}
                    name="sex"
                  >
                    <Radio value="Nam">Nam</Radio>
                    <Radio value="Nữ">Nữ</Radio>
                  </Field>
                  <ErrorMessage
                    name="sex"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
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
              </FormAntd>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
export default ModalAddEmployee;
