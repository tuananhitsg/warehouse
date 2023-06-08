import React, { useEffect, useState } from "react";
import {
  Input,
  Col,
  Row,
  Typography,
  Button,
  Modal,
  Breadcrumb,
  DatePicker,
  Select,
  message,
} from "antd";

import TableData from "./Table";
import statisticApi from "../../../../api/statisticApi";
import wareHouserApi from "../../../../api/wareHouseApi";

const { Title, Text } = Typography;

const QtyInWarehouseStatistic = () => {
  const [wareHouseOption, setWareHouseOption] = useState([]);
  const [wareHouseId, setWareHouseId] = useState("");
  const [wareHouseName, setWareHouseName] = useState("");

  const fetchWarehouse = async () => {
    try {
      const response = await wareHouserApi.getAllWareHouse();
      setWareHouseOption(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  useEffect(() => {
    if (wareHouseOption.length > 0) {
      // Nếu đã có dữ liệu warehouse, set giá trị mặc định cho Select và wareHouseId
      setWareHouseId(wareHouseOption[0].code);
      setWareHouseName(wareHouseOption[0].name);
    }
  }, [wareHouseOption]);
  return (
    <div>
      <Title level={3}>Thống kê số lượng hàng trong kho</Title>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <Col span={12}>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn kho hàng"
            options={wareHouseOption.map((item) => ({
              value: item.code,
              label: item.name,
            }))}

            value={wareHouseId}
            onChange={(value, option) => {
              setWareHouseId(value);
              setWareHouseName(option.label);
            }}
          />
        </Col>
      </Row>
      <Row
        style={{ margin: "1rem 0 1rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={24}>
          <TableData
            selectedWarehouseId={wareHouseId}
            selectedWarehouse={wareHouseName}
          />
        </Col>
      </Row>
    </div>
  );
};
export default QtyInWarehouseStatistic;
