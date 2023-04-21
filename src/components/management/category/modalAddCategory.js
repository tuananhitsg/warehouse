import "../../utils/formError.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form as FormAntd,
  Input,
  message,
  Row,
  Select,
  Space,
  Modal,
} from "antd";

import categoryApi from "../../../api/categoryApi";
import { setReload } from "../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import { createCategoryValues } from "../../utils/initValues";
const ModalAddCategory = ({
  showModalAddCategory,
  setShowModalAddCategory,
}) => {
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  // const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setShowModalAddCategory(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const res = await categoryApi.addCategory(values);
    console.log(res);
    if (res.code) {
      resetForm();
      dispatch(setReload(!reload));
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        title="Thông tin loại sản phẩm"
        width={720}
        onCancel={onClose}
        open={showModalAddCategory}
        footer={null}
      >
        <div className="modal-add-category">
          <Formik
            initialValues={{ ...createCategoryValues.initial }}
            validationSchema={createCategoryValues.validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              setFieldValue,
              handleSubmit,
            }) => (
              <FormAntd
                layout="horizontal"
                labelAlign="left"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
              >
                <FormAntd.Item labelAlign="left" label="Tên loại sản phẩm">
                  <Field
                    as={Input}
                    name="name"
                    placeholder="Nhập tên loại sản phẩm"
                    className="form-field"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </FormAntd.Item>
                <FormAntd.Item labelAlign="left" label="Mô tả">
                  <Field
                    as={Input.TextArea}
                    name="description"
                    placeholder="Nhập mô tả"
                    className="form-field"
                    maxLength={100}
                    autoSize={{ minRows: 3 }}
                    showCount
                    style={{ resize: "none" }}
                  />
                  <ErrorMessage
                    name="description"
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
export default ModalAddCategory;
