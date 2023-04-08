import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Select, Badge, Tag } from "antd";
import { RightOutlined } from "@ant-design/icons";

import InboundApi from "../../../api/inboundApi";

const TableReceipt = ({ record }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [receiptList, setReceiptList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [listReceipt, setListReceipt] = useState([]);

  useEffect(() => {
    fetchDetailByVoucherCode();
  }, []);
  const fetchDetailByVoucherCode = async () => {
    const res = await InboundApi.getReceiptDetailById(record.code);
    console.log(res.receiptVoucherDetails);
    if (res) {
      // const data = res.receiptVoucherDetails
      let i = 0;
      const data = res.receiptVoucherDetails.map((item) => {
        return {
          key: ++i,
          name: item.goods.name,
          categoryName: item.goods.categoryName,
          unit: item.goods.unit,
          nameWarehouse: item.locationInWarehouse.nameWarehouse,
          nameShelf: item.locationInWarehouse.nameShelf,
          nameColumn: item.locationInWarehouse.nameColumn,
          nameRow: item.locationInWarehouse.nameRow,
        };
      });
      setListReceipt(data);

    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",

    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      width: "13%",
    },
    {
      title: "Kho",
      dataIndex: "nameWarehouse",
      key: "nameWarehouse",
      width: "15%",
    },
    {
      title: "Kệ",
      dataIndex: "nameShelf",
      key: "nameShelf",
      width: "13%",
    },
    {
      title: "Cột",
      dataIndex: "nameColumn",
      key: "nameColumn",
      width: "13%",
    },
    {
      title: "Hàng",
      dataIndex: "nameRow",
      key: "nameRow",
      width: "13%",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={listReceipt}  pagination={{ pageSize: 5 }}/>
    </>
  );
};
export default TableReceipt;
