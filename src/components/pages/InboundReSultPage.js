import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import IndexInbound from "../management/inbound/index";
import { useDispatch, useSelector } from "react-redux";
import { setReceipt, setGoods, resetReceipt } from "../../redux/inboundSlice";

const ResultPage = ({ setCurrent, setIsSuccess, isDelivery }) => {
  // const partner = useSelector((state) => state.inboundReducer.info);
  // const goods = useSelector((state) => state.inboundReducer.goods);
  const receipt = useSelector((state) => state.inboundReducer.receipt);
  const [showImport, setShowImport] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleReset = () => {
    // dispatch(setReceipt(null));
    dispatch(resetReceipt());
    setCurrent(0);
    setIsSuccess(false);
  };
  const handleImportClick = () => {
    setShowImport(true);
    navigate("/danh-sach-phieu-nhap");
  };
  return (
    <Result
      status="success"
      title={
        isDelivery
          ? "Tạo phiếu xuất hàng thành công "
          : "Tạo phiếu nhập thành công"
      }
      extra={[
        <Button type="primary" key="console" onClick={handleReset}>
          Tạo phiếu nhập mới
        </Button>,
        <Button key="import" onClick={handleImportClick}>
          Nhập hàng vào kho
        </Button>,
      ]}
    />
  );
};

export default ResultPage;
