import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";

import addressApi from "../../api/addressApi";

const AddressField = () => {
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);

  const onChangeProvince = (value) => {
    console.log(`selected ${value}`);
    setProvincePicked(value);
  };
  const onChangeDistrict = (value) => {
    console.log(`selected ${value}`);
    setDistrictPicked(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  useEffect(() => {
    const fetchConversations = async () => {
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

    fetchConversations();
  }, []);

  useEffect(() => {
    if (provincePicked !== 0) {
      console.log("run");
      const fetchConversations = async (id) => {
        try {
          const response = await addressApi.getList(`/p/${id}?depth=2`);

          console.log(response);
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

      fetchConversations(provincePicked);
    }
  }, [provincePicked]);

  useEffect(() => {
    if (districtPicked !== 0) {
      const fetchConversations = async (id) => {
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

      fetchConversations(districtPicked);
    }
  }, [districtPicked]);

  return (
    <Form layout="vertical" id="form-address">
      <Row gutter={16}>
        <Col span={8}>
          <div id="area">
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
          </div>
        </Col>

        <Col span={8}>
          <Form.Item label=" " name="district">
            <Select
              showSearch0
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
              //onChange={onChangeWard}
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
              style={{
                width: "100%",
              }}
              placeholder="Nhập địa chỉ kho"
              rows={3}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddressField;
