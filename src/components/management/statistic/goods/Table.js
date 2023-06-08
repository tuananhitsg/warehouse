import { Table, message, Col, Button, Row } from "antd";
import { useEffect, useState } from "react";
import goodsApi from "../../../../api/goodsApi";
import statisticApi from "../../../../api/statisticApi";
import {exportExcel} from "../../../excel-export/RPQtyInWarehouse";
import authService from "../../../../service/auth.service";
const TableData = ({ selectedWarehouseId, selectedWarehouse }) => {
  const user = authService.getUser();
  console.log("selectedWarehouse", selectedWarehouse);
  const [listGoods, setListGoods] = useState([]);
  const fetchData = async () => {
    const response = await statisticApi.getGoodsQtyInWarehouse(
      selectedWarehouseId
    );
    const dataArray = Object.keys(response).map((key) => ({
      name: key,
      quantity: response[key],
    }));
    setListGoods(dataArray);
    console.log("data", response);
  };
  useEffect(() => {
    fetchData();
  }, [selectedWarehouseId]);
  const handleExport = () => {
    exportExcel(listGoods, user, selectedWarehouse);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
  ];
  return (
    <>
      <Row gutter={16} style={{ marginBottom: "1rem" }}>
        <Col span={21}></Col>
        <Col span={2}>
          <Button type="primary" title="Xuất file" onClick={handleExport}>
            Xuất báo cáo
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={listGoods}
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>
    </>
  );
};
export default TableData;
