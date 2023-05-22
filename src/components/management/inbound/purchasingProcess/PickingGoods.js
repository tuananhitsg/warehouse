import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Row, Col } from "antd";
import TableGoods from "../../goods/table";

import { useDispatch } from "react-redux";
import { setGoods } from "../../../../redux/inboundSlice";
import FormItem from "antd/es/form/FormItem";

const PickingGoods = ({ next }) => {
  const [selectedGoods, setSelectedGoods] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState("");
  const [disableSelectButton, setDisableSelectButton] = useState(true);
  const [isQuantityModal, setIsQuantityModal] = useState(false);
  //const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [selectedQuantities, setSelectedQuantities] = useState({});

  const restrictInputToNumbers = (event) => {
    const numericKeys = /[0-9]/;
    if (!numericKeys.test(event.key)) {
      event.preventDefault();
    }
  };
  const onSelectChange = (selectedIds, selectedRows) => {
    setSelectedRowKeys(selectedIds);
    setDisableSelectButton(false);
    console.log("selectedRows: ", selectedRows);
    const updatedSelectedGoods = selectedRows.map((row) => ({
      ...row,
      quantity: selectedQuantities[row.code] || 1, // Lấy giá trị quantity từ selectedQuantities nếu có, nếu không thì mặc định là 1
    }));
    setSelectedGoods(updatedSelectedGoods);
  };

  const handleQuantityChange = (record, value) => {
    console.log("value ", value);
    console.log("record ", record);

    const updatedSelectedGoods = selectedGoods.map((item) => {
      if (item?.code === record?.code) {
        // Cập nhật giá trị quantity trong selectedQuantities
        setSelectedQuantities({
          ...selectedQuantities,
          [record.code]: value,
        });
        return { ...item, quantity: value };
      }
      return item;
    });

    setSelectedGoods(updatedSelectedGoods);
  };
  const onDeselect = (record) => {
    console.log("onDeselect", record);
    const updatedSelectedGoods = selectedGoods.filter(
      (item) => item.code !== record.code
    );
    setSelectedGoods(updatedSelectedGoods);

    setSelectedQuantities({
      ...selectedQuantities,
      [record.code]: 1, // Đặt lại giá trị quantity cho hàng bị bỏ chọn bằng 1
    });
  };

  console.log("selectedGoods: ", selectedGoods);
  const rowSelection = {
    onChange: onSelectChange,
    selectedRowKeys,
    onDeselect,
  };

  //xu ly khi bam nut chon
  const handleClick = () => {
    dispatch(setGoods(selectedGoods));
    next(selectedGoods);
  };
  const columns = [
    {
      title: "Mã sản phẩm",
      width: "15%",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Đơn vị",
      width: "15%",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Số lượng",
      width: "15%",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,

      render: (_, record) => (
        <InputNumber
          disabled={!selectedRowKeys.includes(record.code)}
          defaultValue={1}
          min={1}
          onKeyPress={restrictInputToNumbers}
          onChange={(value) => handleQuantityChange(record, value)}
        />
      ),
    },
  ];

  return (
    <>
      <TableGoods
        disableSelectButton={disableSelectButton}
        rowSelection={rowSelection}
        click={handleClick}
        isPickingGoods={true}
        cols={columns}
      />
    </>
  );
};
export default PickingGoods;
