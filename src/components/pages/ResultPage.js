import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import IndexInbound from "../management/inbound/index";
import { useDispatch, useSelector } from "react-redux";
import { setPartner, setGoods } from "../../redux/inboundSlice";

const ResultPage = ({ setCurrent, setIsSucess, isSale }) => {
  const partner = useSelector((state) => state.inboundReducer.info);
  const goods = useSelector((state) => state.inboundReducer.goods);
  const [showImport, setShowImport] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(setGoods(null));
    dispatch(setPartner(null));
    setCurrent(0);
  };
  const handleImportClick = () => {
    setShowImport(true);
    isSale ? navigate("/tao-phieu-xuat") : navigate("/tao-phieu-nhap");
  };
  return (
    <Result
      status="success"
      title="Tạo phiếu mua hàng thành công"
      extra={[
        <Button type="primary" key="console" onClick={handleReset}>
          {isSale ? "Tạo phiếu bán hàng mới" : "Tạo phiếu mua hàng mới"}
        </Button>,
        <Button key="import" onClick={handleImportClick}>
          {isSale ? "Xuất kho" : "Nhập kho"}
        </Button>,
      ]}
    />
  );
};

export default ResultPage;
