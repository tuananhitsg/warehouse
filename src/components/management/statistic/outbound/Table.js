import { Table } from "antd";
import { useEffect, useState } from "react";

const TableData = ({ data }) => {

  console.log("data", data);
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};
export default TableData;
