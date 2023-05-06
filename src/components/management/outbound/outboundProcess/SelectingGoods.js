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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableSalesDetail from "../sales/TableSalesDetail";
import QuantityInput from "./QuantityInput ";
import { setGoods } from "../../../../redux/outboundSlice";
const { Title, Text } = Typography;
const SelectingBin = ({ next }) => {
  
  const salesVoucer = useSelector(
    (state) => state.outboundReducer.salesVoucher
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [purchaseReceipt, setPurchaseReceipt] = useState(null);
  const [goodsCode, setGoodsCode] = useState("");
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
    // {
    //   title: "Số lượng đặt mua",
    //   dataIndex: "quantityPurchased",
    //   key: "quantityPurchased",
    // },
    // {
    //   title: "Số lượng chưa nhập",
    //   dataIndex: "quantityRemaining",
    //   key: "quantityRemaining",
    // },
    {
      title: "Số lượng xuất",
      dataIndex: "quantity",
      key: "quantity",
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
            Chi tiết phiếu bán: {salesVoucer.code}
          </Title>
        </Col>
        <Col span={24} style={{ marginBottom: "1rem", marginLeft: "1rem" }}>
          <Button type="primary" onClick={next}>Tiếp tục</Button>
        </Col>
        <Col span={24}>
          {/* <TablePurchaseDetail record={purchaseVoucher} inboundCols={columns} />
           */}
           <TableSalesDetail record={salesVoucer} inboundCols={columns} />
        </Col>
      </Row>

      {visible ? (
        <Row gutter={16}>
          <Col span={24}>
            <Title level={4} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
              Chọn số lượng xuất: {goodsCode}
            </Title>
          </Col>
          <Col span={24}>
            <QuantityInput 
              show={visible}
              setShow={setVisible}
              //record={purchaseReceipt}
            />
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default SelectingBin;
