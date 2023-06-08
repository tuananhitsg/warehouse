import React, { useEffect, useState } from "react";
import { Button } from "antd";
import TablePartner from "../../partner/Table";
import partnerApi from "../../../../api/partnerApi";
import { useDispatch } from "react-redux";
import { setPartner } from "../../../../redux/outboundSlice";
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
  const getPartnerById = (id) => {
    partnerApi
      .getById(id)
      .then((res) => {
        setSelectedPartner(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows[0]
      );
      getPartnerById(selectedRowKeys);

      //setSelectedPartner(selectedRows[0]);
      onSelectChange(selectedRowKeys);
    },
  };
  console.log("selectedPartner", selectedPartner);
  // xu ly khi bam nut chon
  // const handleClick = (record) => {
  //   dispatch(setPartner(record));
  //   next(record);
  //   console.log(record);
  // };
  const handleButtonClick = () => {
    dispatch(setPartner(selectedPartner));
    next(selectedPartner);
  };
  return (
    <>
      <TablePartner
        disableSelectButton={disableSelectButton}
        rowSelection={{ type: "radio", ...rowSelection }}
        //click={(record) => handleClick(record)}
        buttonClick={handleButtonClick}
      />
    </>
  );
};
export default PickingPartner;
