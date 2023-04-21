import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import IndexInbound from "../management/inbound/index";
import { useDispatch, useSelector } from "react-redux";
import { setPartner, setGoods } from "../../redux/inboundSlice";

const ResultPage = ({ setCurrent, setIsSucess }) => {
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
    navigate("/danh-sach-phieu-mua");
  };
  return (
    <Result
      status="success"
      title="Tạo phiếu nhập thành công"
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
