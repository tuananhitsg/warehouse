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
            quantity: 1,
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
    try {
      const res = await inboundApi.createReceipt(data);
      console.log("res:", res);
      if (res) {
        dispatch(setReload(!reload));
        dispatch(setGoods(null));
        dispatch(setPartner(null));
        message.success("Tạo phiếu nhập thành công!");
        setIsSucess(true);
      }
    } catch (error) {
      console.log("error:", error);
      message.error("Tạo phiếu nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="form-header">
            <img
              className="confirm-img"
              src={confirmImg}
              alt="confirm"
              onClick={handleSubmit}
            />
            <h2 className="form-title">Xác nhận đơn nhập hàng</h2>
          </div>
        </Col>
        <Col span={24}>
          <div className="form-content"></div>
        </Col>
      </Row>
      {/* <div className="form-content__item">
          <div className="form-content__item__title">Mã đối tác</div>
          <div className="form-content__item__value">{data.partnerCode}</div>
        </div>
        <div className="form-content__item">
          <div className="form-content__item__title">Tên đối tác</div>
          <div className="form-content__item__value">{data.partnerName}</div>
        </div>
        <div className="form-content__item">
          <div className="form-content__item__title">Số điện thoại</div>
          <div className="form-content__item__value">{data.partnerPhone}</div>
        </div>
        <div className="form-content__item">
          <div className="form-content__item__title">Địa chỉ</div>
          <div className="form-content__item__value">{data.partnerAddress}</div>
        </div>
        <div className="form-content__item">
          <div className="form-content__item__title">Ngày nhập</div>
          <div className="form-content__item__value">{data.date}</div>
        </div>
        <div className="form-content__item">
          <div className="form-content__item__title">Tổng số lượng</div>
          <div className="form-content__item__value">{data.totalQuantity}</div> 
        </div> */}
    </div>
  );
};
export default Confirmation;
