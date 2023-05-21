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
  Typography,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import InboundApi from "../../../../api/inboundApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TablePurchaseDetail from "../purchase/TablePurChaseDetail";
import SelectingWarehouse from "./SelectingWarehouse";
import { setGoods } from "../../../../redux/inboundSlice";
const { Title, Text } = Typography;
const SelectingBin = ({ next }) => {
  const purchaseVoucher = useSelector(
    (state) => state.inboundReducer.purchased
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [purchaseReceipt, setPurchaseReceipt] = useState(null);
  const [goodsCode, setGoodsCode] = useState("");
  const [isPicked, setIsPicked] = useState(false);
  const showFormInbound = (record) => {
    setVisible(true);
    setPurchaseReceipt(record);
    setGoodsCode(record.name);
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
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
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
      title: "Số lượng còn lại",
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
          name = "Chưa tạo";
        } else if (status === "NOT_DONE_CREATED") {
          color = "cyan";
          name = "Chưa tạo xong";
        } else if (status === "CREATED") {
          color = "blue";
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
            disabled={record.quantityRemaining === 0}
            type="primary"
            icon={<SendOutlined />}
            onClick={() => {
              showFormInbound(record);
              //record(record);
              dispatch(setGoods(record));
              //next(record);
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={4} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
            Chi tiết phiếu mua: {purchaseVoucher.code}
          </Title>
        </Col>
        <Col span={24} style={{ marginBottom: "1rem", marginLeft: "1rem" }}>
          <Button type="primary" onClick={next} disabled={!isPicked}>
            Tiếp tục
          </Button>
        </Col>
        <Col span={24}>
          <TablePurchaseDetail record={purchaseVoucher} inboundCols={columns} />
        </Col>
      </Row>

      {visible ? (
        <Row gutter={16}>
          <Col span={24}>
            <Title level={4} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
              Chọn vị trí nhập cho sản phẩm: {goodsCode}
            </Title>
          </Col>
          <Col span={24}>
            <SelectingWarehouse
              show={visible}
              setShow={setVisible}
              record={purchaseReceipt}
              setIsPicked={setIsPicked}
            />
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default SelectingBin;
