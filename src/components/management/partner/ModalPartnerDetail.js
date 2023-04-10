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
import partnerApi from "../../../api/partnerApi";
import { getProvinceList, getDistrictList, getWardList } from "../../../service/province.service";
import { useDispatch } from "react-redux";
const ModalPartnerDetail = ({
  showModalPartnerDetail,
  setShowModalPartnerDetail,
  selectedId,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onClose = () => {
    setShowModalPartnerDetail(false);
  };

  const handleSubmit = async (values) => {

  };

  useEffect(() => {
    console.log("selectedId", selectedId);
    const fetchData = async (id) => {
      try {
        const res = await partnerApi.getById(id);
        if (res) {
          console.log("res:", res);

          form.setFieldsValue({
            ...res,
          });
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
          extra={
            <Space>
              <Button onClick={onClose}>Huỷ</Button>
              <Button type="primary" form="myForm" htmlType="submit">
                Xác nhận
              </Button>
            </Space>
          }
        >
          <Form
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
              </Col>

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
            </Row>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};
export default ModalPartnerDetail;
