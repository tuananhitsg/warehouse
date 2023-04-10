import React, { useEffect, useState } from "react";
import { Button } from "antd";
import TableGoods from "../../goods/table";

import { useDispatch } from "react-redux";
import { setGoods } from "../../../../redux/inboundSlice";

const PickingGoods = ({ next }) => {
  const [selectedGoods, setSelectedGoods] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState("");
  const [disableSelectButton, setDisableSelectButton] = useState(true);

  const dispatch = useDispatch();

  const onSelectChange = (selectedIds, selectedRows) => {
    setSelectedRowKeys(selectedIds);
    setDisableSelectButton(false);
    console.log("selectedRows: ", selectedRows);
    setSelectedGoods(selectedRows);
  };

  const rowSelection = {
    onChange: onSelectChange,
    selectedRowKeys,
  };
  //xu ly khi bam nut chon
  const handleClick = () => {
    dispatch(setGoods(selectedGoods));
    next(selectedGoods);
  };
  // const columns = [
  //   {
  //     title: "Mã sản phẩm",
  //     width: "15%",
  //     dataIndex: "code",
  //     key: "code",

  //   },
  //   {
  //     title: "Tên sản phẩm",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Loại sản phẩm",
  //     dataIndex: "categoryName",
  //     key: "categoryName",
  //   },
  // ];
  return (
    <>
      <TableGoods
        disableSelectButton={disableSelectButton}
        rowSelection={rowSelection}
        click={handleClick}
       // cols={columns}
      />
    </>
  );
};
export default PickingGoods;
