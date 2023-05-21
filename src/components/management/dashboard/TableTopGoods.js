import React from "react";
import { Table, Divider } from "antd";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Loại sản phẩm",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Số lượng",
    dataIndex: "total",
    key: "total",
  },
];

const TableTopImport = ({ title, data }) => (
  <>
    <Divider>{title}</Divider>
    <Table
      columns={columns}
      dataSource={data}
      size="middle"
      pagination={false}
    />
  </>
);
const TableTopExport = ({ title, data }) => (
  <>
    <Divider>{title}</Divider>
    <Table
      columns={columns}
      dataSource={data}
      size="middle"
      pagination={false}
    />
  </>
);
export { TableTopImport, TableTopExport };
