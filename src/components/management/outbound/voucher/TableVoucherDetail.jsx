import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Select, Badge, Tag } from "antd";
import { RightOutlined } from "@ant-design/icons";

import OutboundApi from "../../../../api/outboundApi";

const TableVoucherDetail = ({ record }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [receiptList, setReceiptList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [listReceipt, setListReceipt] = useState([]);

  useEffect(() => {
    fetchDetailByVoucherCode();
  }, []);
  const fetchDetailByVoucherCode = async () => {
    const res = await OutboundApi.getDeliveryByVoucherCode(record.code);
    console.log("receiptVoucherDetails",res.receiptVoucherDetails);
    if (res) {
      // const data = res.receiptVoucherDetails
      let i = 0;
      const data = res.details.map((item) => {
        return {
          key: ++i,
          name: item.goods.name,
          code: item.goods.code,
          categoryName: item.goods.categoryName,
          unit: item.goods.unit,
          nameWarehouse: item.locationInWarehouse.nameWarehouse,
          nameShelf: item.locationInWarehouse.nameShelf,
          codeRow: item.locationInWarehouse.codeRow,
          nameColumn: item.locationInWarehouse.nameColumn,
          nameRow: item.locationInWarehouse.nameRow,
          quantity: item.quantity,
        };
      });
      setListReceipt(data);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: "5%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        `${record.code} - ${text}`
      )
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
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Kho xuất",
      dataIndex: "nameWarehouse",
      key: "nameWarehouse",
      width: "15%",
    },
    {
      title: "Kệ",
      dataIndex: "codeRow",
      key: "codeRow",
      // render: (text, record) => ( 
      //   `${text} - ${record.nameShelf}`
      // )
    },

  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={listReceipt}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
export default TableVoucherDetail;
