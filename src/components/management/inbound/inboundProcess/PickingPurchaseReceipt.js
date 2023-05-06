import React, { useEffect, useState } from "react";

import { TablePurchaseReceipt } from "../purchase";
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
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setPurchased } from "../../../../redux/inboundSlice";

const PickingPurchasesReceipt = ({ next }) => {
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Mã phiếu mua",
      width: "15%",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        let name = "";
        if (status === "NOT_DONE_YET") {
          color = "error";
          name = "Chưa hoàn thành";
        } else if (status === "DONE") {
          color = "cyan";
          name = "Đã hoàn thành";
        }
        return (
          <Tag color={color} key={name}>
            {name?.toUpperCase()}
          </Tag>
        );
      },
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
      title: "Thao tác",
      key: "action",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => {
              dispatch(setPurchased(record));
              next(record);
            }}
            disabled={record.status === "DONE"}
            type="primary"
            icon={<LoginOutlined />}
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
      <TablePurchaseReceipt
        inboundCols={columns}
        //handleClick={handleClick}
      ></TablePurchaseReceipt>
    </>
  );
};
export default PickingPurchasesReceipt;
