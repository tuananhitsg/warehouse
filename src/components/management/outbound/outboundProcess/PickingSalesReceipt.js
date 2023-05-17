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
  Tooltip,
  message,
} from "antd";
import { RightSquareOutlined, LogoutOutlined } from "@ant-design/icons";
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
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createDate) => {
        const date = new Date(createDate);
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
          <Tooltip title="Chọn phiếu">
            <Button
              onClick={() => {
                dispatch(setSalesVoucher(record));
                next(record);
              }}
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
      <TableSalesReceipt
        inboundCols={columns}
        //handleClick={handleClick}
      ></TableSalesReceipt>
    </>
  );
};
export default PickingPurchasesReceipt;
