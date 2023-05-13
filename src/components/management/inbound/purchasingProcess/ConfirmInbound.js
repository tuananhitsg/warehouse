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
import { setPartner, setGoods } from "../../../../redux/inboundSlice";
import ResultPage from "../../../pages/ResultPage";

const Confirmation = ({ setIsSucess }) => {
  const partner = useSelector((state) => state.inboundReducer.info);
  const goods = useSelector((state) => state.inboundReducer.goods);
  const reload = useSelector((state) => state.reloadReducer.reload);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const data = {
      goodsRequests: [
        ...goods.map((item) => {
          return {
            name: item.name,
            height: item.height,
            width: item.width,
            length: item.length,
            unit: item.unit,
            quantity: item.quantity,
            categoryCode: item.categoryCode,
          };
        }),
      ],
      partnerRequest: {
        name: partner.name,
        address: partner.address,
        phone: partner.phone,
      },
    };

    setLoading(true);
    const res = await inboundApi.createPurchaseReceipt(data);
    console.log("res:", res);
    if (res) {
      dispatch(setReload(!reload));
      setIsSucess(true);
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
            <h2 className="form-title">Xác nhận phiếu mua hàng</h2>
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
              <Form.Item label="Đối tác" className="form-item-label">
                <div className="form-text">
                  <div className="item-text">
                    {partner.name}, {partner.phone}, {partner.address.street},{" "}
                    {partner.address.ward}, {partner.address.district},{" "}
                    {partner.address.province}
                  </div>
                </div>
              </Form.Item>
              <Form.Item label="Sản phẩm" className="form-item-label">
                <div className="form-text">
                  {goods?.map((item) => {
                    return (
                      <div key={item.code} className="item-text">
                        <img
                          src={item.image}
                          alt="Product Image"
                          style={{ width: "400px", height: "200px" }}
                        />
                        {item.name} - {item.quantity} {item.unit}
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
