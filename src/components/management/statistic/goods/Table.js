import { Table } from "antd";
import { useEffect, useState } from "react";
import goodsApi from "../../../../api/goodsApi";
const TableData = ({ data }) => {
  console.log("data", data);
  const [listGoods, setListGoods] = useState([]);
  const fetchGoods = async () => {
    try {
      const response = await goodsApi.getGoods();
      setListGoods(response);
      console.log("listGoods", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGoods();
  }, []);

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "categoryName",
    },
    {
      title: "Số lượng",
      dataIndex: "total",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={listGoods}
      pagination={{ pageSize: 5 }}
    />
  );
};
export default TableData;
