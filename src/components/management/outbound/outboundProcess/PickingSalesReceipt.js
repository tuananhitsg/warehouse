import React, { useEffect, useState } from "react";

import { TableSalesReceipt } from "../sales";
import {
  Space,
  Input,
  Table,
  Button,
  Modal,
  Tag,
  Row,
  Col,
  message,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setSalesVoucher, setReceipt } from "../../../../redux/outboundSlice";

const PickingPurchasesReceipt = ({ next }) => {
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  const dispatch = useDispatch();
  // const handleReset = () => {
  //   dispatch(setReceipt({}));
  // };
  // useEffect(() => {
  //   handleReset();
  // }, []);
  const columns = [
    {
      title: "Mã phiếu bán",
      width: "15%",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Đối tác",
      dataIndex: "partner",
      key: "partner",

      render: (partner) => {
        return partner?.name;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "partner",
      key: "partner",
      width: "40%",
      render: (partner) => {
        return `${partner?.address?.street}, ${partner?.address?.ward}, ${partner?.address?.district}, ${partner?.address?.province}`;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => {
              dispatch(setSalesVoucher(record));
              next(record);
            }}
            type="primary"
            icon={<LogoutOutlined />}
          />
        </Space>
      ),
    },
  ];
  // const handleClick = () => {
  //   dispatch(setPurchased(selectedPurchases));
  //   next(selectedPurchases);
  // };
  return (
    <>
      <TableSalesReceipt
        inboundCols={columns}
        //handleClick={handleClick}
      ></TableSalesReceipt>
    </>
  );
};
export default PickingPurchasesReceipt;
