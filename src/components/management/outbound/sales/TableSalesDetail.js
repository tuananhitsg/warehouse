import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Select, Badge, Tag, Space } from "antd";
import { RightOutlined, LoginOutlined } from "@ant-design/icons";

import OutboundApi from "../../../../api/outboundApi";

const TableSalesDetail = ({ record, inboundCols }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [receiptList, setReceiptList] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [listReceipt, setListReceipt] = useState([]);

  const [showModalConfirmPut, setShowModalConfirmPut] = useState(false);

  useEffect(() => {
    fetchDetailByVoucherCode();
  }, []);
  const fetchDetailByVoucherCode = async () => {
    const res = await OutboundApi.getSalesReceiptByCode(record.code);
    console.log(res);
    if (res) {
      // const data = res.receiptVoucherDetails
      let i = 0;
      const data = res.saleDetailResponses.map((item) => {
        return {
          key: ++i,
          code: item.goods.code,
          name: item.goods.name,
          categoryName: item.goods.categoryName,
          unit: item.goods.unit,
          quantityRemaining: item.quantityRemaining,
          quantitySale: item.quantitySale,
          status: item.status,
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
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
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
      title: "Số lượng bán",
      dataIndex: "quantitySale",
      key: "quantitySale",
    },
    {
      title: "Số lượng chưa xuất",
      dataIndex: "quantityRemaining",
      key: "quantityRemaining",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        let name = "";
        if (status === "NOT_YET_CREATED") {
          color = "error";
          name = "Chưa xuât hết";
        } else if (status === "DONE") {
          color = "cyan";
          name = "Đã xuất hết";
        } else if (status === "CREATED") {
          color = "blue";
          name = "Đã xuất hết";
        }
        return (
          <Tag color={color} key={name}>
            {name?.toUpperCase()}
          </Tag>
        );
      },
    },
  ];
  const showModalConfirm = (code) => {
    setShowModalConfirmPut(true);
    setSelectedId(code);
  };
  return (
    <>
      <Table
        columns={inboundCols ? inboundCols : columns}
        dataSource={listReceipt}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};
export default TableSalesDetail;
