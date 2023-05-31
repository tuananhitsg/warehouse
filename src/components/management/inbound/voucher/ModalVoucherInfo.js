import React, { useState, useEffect, useRef } from "react";

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
  DatePicker,   
  Drawer,
} from "antd";
import InboundApi from "../../../../api/inboundApi";
import TableVoucherDetail from "./TableVoucherDetail";
import ReactToPrint from "react-to-print";
const ModalVoucherInfo = ({
  showModalVoucherDetail,
  setShowModalVoucherDetail,
  record,
}) => {
  console.log("record", record);
  const [listReceipt, setListReceipt] = useState([]);
  useEffect(() => {
    fetchDetailByVoucherCode();
  }, []);
  const fetchDetailByVoucherCode = async () => {
    const res = await InboundApi.getReceiptDetailById(record.code);
    console.log("receiptVoucherDetails", res);
    if (res) {
      setListReceipt(res);
    }
  };
  let componentRef = useRef();
  const PrintTemplate = () => {
    return (
      <>
        <div className="print-template">
          <div
            className="print-template__header"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              HỆ THỐNG QUẢN LÝ KHO HÀNG TIỆN LỢI
            </span>
            <span
              style={{
                marginTop: "10px",
                fontSize: "20px",
              }}
            >
              4 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí Minh
            </span>
            <span
              style={{
                fontSize: "20px",
              }}
            >
              Điện thoại: 084 123 456
            </span>
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              PHIẾU NHẬP
            </span>
          </div>
          <div
            className="print-template__body"
            style={{
              marginTop: "10px",
            }}
          >
            <div
              className="print-template__body__info"
              style={{
                marginRight: "50px",
                marginLeft: "50px",
              }}
            >
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={24}>
                  <span className="info">
                    Kho:
                    <span> </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                  <span className="info">
                    Mã hoán đơn:
                    <span> {listReceipt?.code}</span>
                  </span>
                </Col>
                <Col span={12}>
                  <span className="info">
                    Ngày tạo:
                    <span> {listReceipt?.createDate} </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                  <span className="info">
                    Trạng thái:
                    <span>{listReceipt?.status}</span>
                  </span>
                </Col>
                <Col span={12}>
                  <span className="info">
                    Nhân viên:
                    <span>{listReceipt?.createdBy}</span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={12}>
                  <span className="info">
                    Khách hàng:
                    <span> {listReceipt?.partner?.name} </span>
                  </span>
                </Col>
                <Col span={12}>
                  <span className="info">
                    SDT:
                    <span> {listReceipt?.partner?.phone} </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: "10px" }}>
                <Col span={24}>
                  <span className="info">
                    Địa chỉ:
                    <span>
                      {" "}
                      {listReceipt?.partner?.address?.street}-
                      {listReceipt?.partner?.address?.ward}-
                      {listReceipt?.partner?.address?.district}-
                      {listReceipt?.partner?.address?.province}
                    </span>
                  </span>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: "30px" }}>
                <Col span={12}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    
                    Danh sách sản phẩm
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <TableVoucherDetail record={record} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </>
    );
  };
  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
          <PrintTemplate />
        </div>
      );
    }
  }
  return (
    <>
      <Drawer
        title="Chi tiết phiếu nhập"
        open={showModalVoucherDetail}
        onClose={() => setShowModalVoucherDetail(false)}
      >
        <TableVoucherDetail record={record} />
      </Drawer>
    </>
  );
};
export default ModalVoucherInfo;
