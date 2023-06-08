import React, { useEffect, useState } from "react";
import { Col, Row, Table, Typography } from "antd";

import {
  CardDashboard_topGoodsEx,
  CardDashboard_topGoodsIm,
} from "./CardDashboard";
import ColumnChart from "./ColunmChart";
import PieChart from "./PieChart";
import { TableTopImport, TableTopExport } from "./TableTopGoods";

import statisticApi from "../../../api/statisticApi";
import moment from "moment";
const { Title, Text } = Typography;
const IndexDashboard = () => {
  const [top5Imported, setTop5Imported] = useState([]);
  const [top5Exported, setTop5Exported] = useState([]);
  const [top1Imported, setTop1Imported] = useState([]);
  const [top1Exported, setTop1Exported] = useState([]);
  const fetchTop5Goods = async () => {
    const currentMonth = moment().format("MM");
    const response1 = await statisticApi.getTop5ImportedInMonth(currentMonth);
    const response2 = await statisticApi.getTop5ExportedInMonth(currentMonth);

    setTop5Imported(response1);
    setTop5Exported(response2);
  };
  const fetchTop1Goods = async () => {
    const res1 = await statisticApi.getTop1GoodsImported();
    const res2 = await statisticApi.getTop1GoodsExported();
    setTop1Imported(res1);
    setTop1Exported(res2);
  };
  useEffect(() => {
    fetchTop5Goods();
    fetchTop1Goods();
  }, []);
  return (
    <div className="site-card-wrapper">
      <Title level={5}>Dashboard</Title>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={14}>
          <PieChart />
        </Col>
        <Col span={9}>
          <Row gutter={16}>
            <Col span={24} style={{marginBottom:"1rem"}}>
              <CardDashboard_topGoodsEx data={top1Exported} />
            </Col>
            <Col span={24}>
              <CardDashboard_topGoodsIm data={top1Imported} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{ margin: "4rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={12}>
          <TableTopImport
            title={"Top 5 sản phẩm được nhập nhiều nhất trong tháng"}
            data={top5Imported}
          />
        </Col>
        <Col span={12}>
          <TableTopExport
            title={"Top 5 sản phẩm được xuất nhiều nhất trong tháng"}
            data={top5Exported}
          />
        </Col>
      </Row>
    </div>
  );
};
export default IndexDashboard;
