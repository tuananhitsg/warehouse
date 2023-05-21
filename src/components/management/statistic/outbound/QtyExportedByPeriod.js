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
import moment from "moment";
import dayjs from "dayjs";
import TableData from "./Table";
import statisticApi from "../../../../api/statisticApi";
const { Title } = Typography;
const { RangePicker } = DatePicker;
const QtyExportedByPeriod = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const fetchData = async () => {
    const response = await statisticApi.getQtyExportedByPeriod(
      fromDate,
      toDate
    );
    const dataArray = Object.keys(response).map((key) => ({
      name: key,
      quantity: response[key],
    }));
    setData(dataArray);
    console.log("data", data);
  };
  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);

  const onChangeDate = (date, dateString) => {
    setFromDate(dateString[0]);
    setToDate(dateString[1]);
  };
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };
  return (
    <div>
      <Title level={3}>Thống kê số lượng hàng xuất theo thời gian</Title>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <Col span={8}>
          <RangePicker
            onChange={onChangeDate}
            disabledDate={disabledDate}
            defaultValue={[dayjs(moment().startOf("month")), dayjs(moment())]}
          />
        </Col>
        <Col span={4} style={{ position: "absolute", right: "2.5%" }}>
          <Button
            type="primary"
            title="Xuất file"
            //onClick={handleExportExcel}
          >
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
export default QtyExportedByPeriod;
