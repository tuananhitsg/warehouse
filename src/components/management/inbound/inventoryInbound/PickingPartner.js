import React, { useEffect, useState } from "react";
import { Button } from "antd";
import TablePartner from "../../partner/Table";

import { useDispatch } from "react-redux";
import { setPartner } from "../../../../redux/inboundSlice";
const PickingPartner = ({ next }) => {
  const [selectedPartner, setSelectedPartner] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState("");
  const [selectedRows, setSelectedRows] = useState("");
  const [disableSelectButton, setDisableSelectButton] = useState(true);

  const dispatch = useDispatch();

  const onSelectChange = (selectedId) => {
    setSelectedRowKeys(selectedId);
    setDisableSelectButton(false);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows[0]
      );
      setSelectedPartner(selectedRows[0]);
      onSelectChange(selectedRowKeys);
    },
  };
  //xu ly khi bam nut chon
  const handleClick = (record) => {
    dispatch(setPartner(record));
    next(record);
  };
  const handleButtonClick = () => {
    dispatch(setPartner(selectedPartner));
    next(selectedPartner);
  }
  return (
    <>
      <TablePartner
        disableSelectButton={disableSelectButton}
        rowSelection={{ type: "radio", ...rowSelection }}
        click={(record) => handleClick(record)}
        buttonClick={handleButtonClick}
      />
    </>
  );
};
export default PickingPartner;
