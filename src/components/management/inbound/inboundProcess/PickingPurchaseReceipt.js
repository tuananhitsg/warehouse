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
  Tooltip,
} from "antd";
import { LoginOutlined, RightSquareOutlined } from "@ant-design/icons";
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
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate) => {
        const date = new Date(createdDate);
        const formattedDate = date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedDate;
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
          <Tooltip title="Chọn phiếu">
            <Button
              onClick={() => {
                dispatch(setPurchased(record));
                next(record);
              }}
              disabled={record.status === "CREATED"}
              type="primary"
              icon={<RightSquareOutlined />}
            />
          </Tooltip>
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
