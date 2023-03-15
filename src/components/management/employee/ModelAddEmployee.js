import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
// import openAddressApi from "../../api/openApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";


const { Option } = Select;

const ModelAddEmployee = ({
  showModalAddCustomer,
  setShowModalAddCustomer,
}) => {
  // const [province, setProvince] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [wards, setWards] = useState([]);
  // const [provincePicked, setProvincePicked] = useState(0);
  // const [districtPicked, setDistrictPicked] = useState(0);

  // const onChangeProvince = (value) => {
  //   console.log(`selected ${value}`);
  //   setProvincePicked(value);
  // };
  // const onChangeDistrict = (value) => {
  //   console.log(`selected ${value}`);
  //   setDistrictPicked(value);
  // };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalAddCustomer(false);
  };

  //handle submit form create new customer...
  const handleSubmit = () => {
    //write code in here...
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  // useEffect(() => {
  //   const fetchConversations = async () => {
  //     try {
  //       const response = await openAddressApi.getList("/p");

  //       //console.log(response);
  //       if (response) {
  //         const newResponse = response.map((val) => {
  //           return {
  //             value: val.code,
  //             label: val.name,
  //           };
  //         });
  //         setProvince(newResponse);
  //       }
  //     } catch (error) {
  //       console.log("Failed to fetch conversation list: ", error);
  //     }
  //   };

  //   fetchConversations();
  // }, []);

  // useEffect(() => {
  //   if (provincePicked !== 0) {
  //     console.log("run");
  //     const fetchConversations = async (id) => {
  //       try {
  //         const response = await openAddressApi.getList(`/p/${id}?depth=2`);

  //         console.log(response);
  //         if (response) {
  //           const { districts } = response;
  //           const newDistricts = districts.map((val) => {
  //             return {
  //               value: val.code,
  //               label: val.name,
  //             };
  //           });
  //           setDistricts(newDistricts);
  //         }
  //       } catch (error) {
  //         console.log("Failed to fetch conversation list: ", error);
  //       }
  //     };

  //     fetchConversations(provincePicked);
  //   }
  // }, [provincePicked]);

  // useEffect(() => {
  //   if (districtPicked !== 0) {
  //     const fetchConversations = async (id) => {
  //       try {
  //         const response = await openAddressApi.getList(`/d/${id}?depth=2`);

  //         console.log(response);
  //         if (response) {
  //           const { wards } = response;
  //           const newWards = wards.map((val) => {
  //             return {
  //               value: val.code,
  //               label: val.name,
  //             };
  //           });
  //           setWards(newWards);
  //         }
  //       } catch (error) {
  //         console.log("Failed to fetch conversation list: ", error);
  //       }
  //     };

  //     fetchConversations(districtPicked);
  //   }
  // }, [districtPicked]);

  return (
    <>
      <Drawer
        title="Thêm nhân viên"
        width={720}
        onClose={onClose}
        open={showModalAddCustomer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên nhân viên...",
                  },
                ]}
              >
                <Input placeholder="Hãy nhập tên nhân viên..." />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Hãy nhập số điện thoại">
                <Input placeholder="Hãy nhập số điện thoại..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Hãy nhập email">
                <Input placeholder="Hãy nhập email..." />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: "26px" }} gutter={16}>
            <Col span={12}>
              <Select
                placeholder="Chọn chức vụ"
                style={{
                  width: "100%",
                }}
                onChange={handleChangePosition}
                options={[
                  {
                    value: "manager",
                    label: "Quản lý",
                  },
                  {
                    value: "staff1",
                    label: "Nhân viên thu ngân",
                  },
                  {
                    value: "staff2",
                    label: "Nhân viên hậu cần",
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <DatePicker
                onChange={onChangeDate}
                style={{ width: "100%" }}
                placeholder="Chọn ngày vào làm"
              />
            </Col>
          </Row>

          {/* <Row gutter={16}>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Chọn tỉnh thành"
                optionFilterProp="children"
                onChange={onChangeProvince}
                onSearch={onSearch}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={province}
              />
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "24px" }}>
            <Col span={12}>
              <Select
                showSearch
                placeholder="Chọn phường/xã"
                optionFilterProp="children"
                // onChange={onChange}
                onSearch={onSearch}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={wards}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Nhập địa chỉ nhân viên...",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nhập địa chỉ nhân viên..."
                />
              </Form.Item>
            </Col> */}
          {/* </Row> */}
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddEmployee;
