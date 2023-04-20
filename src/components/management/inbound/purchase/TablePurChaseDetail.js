import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Select, Badge, Tag, Space } from "antd";
import { RightOutlined, LoginOutlined } from "@ant-design/icons";

import InboundApi from "../../../../api/inboundApi";

const TablePurchaseDetail = ({ record }) => {
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
    const res = await InboundApi.getByCodePurchaseReceipt(record.code);
    console.log(res.purchaseDetails);
    if (res) {
      // const data = res.receiptVoucherDetails
      let i = 0;
      const data = res.purchaseDetails.map((item) => {
        return {
          key: ++i,
          name: item.goods.name,
          categoryName: item.goods.categoryName,
          unit: item.goods.unit,
          quantityPurchased: item.quantityPurchased,
          quantityActual: item.quantityActual,
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
      title: "Số lượng đặt mua",
      dataIndex: "quantityPurchased",
      key: "quantityPurchased",
    },
    {
      title: "Số lượng thực nhập",
      dataIndex: "quantityActual",
      key: "quantityActual",
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
          name = "Chưa tạo";
        } else if (status === "DONE") {
          color = "cyan";
          name = "Đã tạo";
        }
        return (
          <Tag color={color} key={name}>
            {name?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => showModalConfirm(record.code)}
            type="primary"
            icon={<LoginOutlined />}
          />
        </Space>
      ),
    },
  ];
  const showModalConfirm = (code) => {
    setShowModalConfirmPut(true);
    setSelectedId(code);
  };
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
export default TablePurchaseDetail;
