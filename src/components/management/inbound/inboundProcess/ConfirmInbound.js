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
import inboundApi from "../../../../api/inboundApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../../redux/reloadSlice";
import { resetReceipt } from "../../../../redux/inboundSlice";
import {
  setPartner,
  setGoods,
  setReceipt,
} from "../../../../redux/inboundSlice";
import ResultPage from "../../../pages/ResultPage";

const Confirmation = ({ setIsSuccess }) => {
  const receipt = useSelector((state) => state.inboundReducer.receipt);
  const purchased = useSelector((state) => state.inboundReducer.purchased);
  const reload = useSelector((state) => state.reloadReducer.reload);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("receipt:", receipt);
    const data = {
      goodsToCreateVoucher: [...receipt],
    };
    const purchaseCode = purchased.code;
    console.log("data:", data);
    console.log("purchaseCode:", purchaseCode);
    setLoading(true);
    const res = await inboundApi.createReceipt(purchaseCode, data);
    console.log("res:", res);
    if (res) {
      dispatch(resetReceipt());
      dispatch(setReload(!reload));
      setIsSuccess(true);
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
            <h2 className="form-title">Xác nhận phiếu nhập</h2>
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
              <Form.Item label="Mã phiếu mua" className="form-item-label">
                <div className="form-text">{purchased.code}</div>
              </Form.Item>

              <Form.Item label="Sản phẩm" className="form-item-label">
                <div className="form-text">
                  {receipt?.map((item) => {
                    return (
                      <div key={item.goodsCode} className="item-text">
                        Sản phẩm: {item.goodsCode} - {item.name}<br></br>
                        Số lượng: {item.quantity}<br></br>
                        Vị trí: {item.binLocationCode}
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
