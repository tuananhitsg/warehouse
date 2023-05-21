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
  const [data, setData] = useState([]);

  const fetchWarehouse = async () => {
    try {
      const response = await wareHouserApi.getAllWareHouse();
      setWareHouseOption(response);
      console.log("warehouse trong modal", response);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu kho thất bại");
    }
  };
  const fetchData = async () => {
    try {
      const response = await statisticApi.getGoodsQtyInWarehouse();
      setData(response);
      console.log("data", response);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu thất bại");
    }
  };
  useEffect(() => {
    fetchWarehouse();
    fetchData();
    //handleSearchUsableBin();
  }, []);
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
            style={{
              width: "200px",
              margin: "0 1rem",
            }}
            placeholder="Chọn kho hàng"
            options={wareHouseOption.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Col>
        <Col span={4} style={{ position: "absolute", right: "2.5%" }}>
          <Button type="primary" title="Xuất file">
            Xuất báo cáo
          </Button>
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
          <TableData data={data} />
        </Col>
      </Row>
    </div>
  );
};
export default QtyInWarehouseStatistic;
