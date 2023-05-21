import confirmImg from "../../../../assets/circle-twotone-to-confirm-circle-twotone-transition.svg";
import "./style.scss";
import React, { useEffect, useState } from "react";
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
  Form,
} from "antd";
import OutboundApi from "../../../../api/outboundApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../../redux/reloadSlice";
import {
  setPartner,
  setGoods,
  setReceipt,
} from "../../../../redux/inboundSlice";
import ResultPage from "../../../pages/ResultPage";

const Confirmation = ({ setIsSucess }) => {
  const receipt = useSelector((state) => state.outboundReducer.receipt);
  const sales = useSelector((state) => state.outboundReducer.salesVoucher);
  const reload = useSelector((state) => state.reloadReducer.reload);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("receipt:", receipt);
    const data = {
      goodsRequests: [...receipt],
    };
    const salesCode = sales.code;
    console.log("data:", data);
    console.log("purchaseCode:", salesCode);
    setLoading(true);
    const res = await OutboundApi.createDelivery(salesCode, data);
    console.log("res outbound:", res);
    try {
      if (res) {
        dispatch(setReload(!reload));
        setIsSucess(true);
        setLoading(false);
        message.success("Tạo phiếu phiếu xuất thành công");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      message.error("Tạo phiếu xuất thất bại");
    }
  };

  return (
    <div className="form-confirmation">
      <Row>
        <Col span={24}>
          <div className="form-header">
            <img
              className="confirm-img"
              src={confirmImg}
              alt="confirm"
              onClick={handleSubmit}
            />
            <h2 className="form-title">Xác nhận phiếu xuất</h2>
          </div>
        </Col>
        <Col span={24}>
          <div className="form-content">
            <Form
              layout="horizontal"
              labelAlign="left"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Form.Item label="Mã phiếu bán" className="form-item-label">
                <div className="form-text">{sales.code}</div>
              </Form.Item>

              <Form.Item label="Sản phẩm" className="form-item-label">
                <div className="form-text">
                  {receipt?.map((item) => {
                    return (
                      <div key={item.goodCode} className="item-text">
                        Sản phẩm: {item.goodCode} -{item.name}
                        <br></br>
                        Số lượng: {item.quantity}
                      </div>
                    );
                  })}
                </div>
              </Form.Item>

              <Button
                className="btn-submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={handleSubmit}
              >
                Xác nhận
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Confirmation;
