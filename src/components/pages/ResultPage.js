import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import IndexInbound from "../management/inbound/index";

const ResultPage = ({ setCurrent, setIsSucess }) => {
    const [showImport, setShowImport] = useState(false);
  const handleReset = () => {
    setCurrent(0);
  };
    const handleImportClick  = () => {
        setShowImport(true);
    }
  return (
    <Result
      status="success"
      title="Tạo phiếu nhập thành công"
      extra={[
        <Button type="primary" key="console" onClick={handleReset}>
          Tạo phiếu nhập mới
        </Button>,
        <Button key="import" onClick={handleImportClick}>Nhập hàng vào kho</Button>,
      ]}
    />
  );
};

export default ResultPage;
