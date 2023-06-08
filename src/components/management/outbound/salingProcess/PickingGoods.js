import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Col,
  message,
} from "antd";
import TableGoods from "../../goods/table";

import { useDispatch } from "react-redux";
import { setGoods } from "../../../../redux/outboundSlice";
import FormItem from "antd/es/form/FormItem";
import goodsApi from "../../../../api/goodsApi";
const PickingGoods = ({ next }) => {
  const [selectedGoods, setSelectedGoods] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState("");
  const [disableSelectButton, setDisableSelectButton] = useState(true);
  const [isQuantityModal, setIsQuantityModal] = useState(false);
  //const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [goodQuantity, setGoodQuantity] = useState({});
  const restrictInputToNumbers = (event) => {
    const numericKeys = /[0-9]/;
    if (!numericKeys.test(event.key)) {
      event.preventDefault();
    }
  };
  //fetch so luong hang ton`
  useEffect(() => {
    const fetchQuantity = async () => {
      const res = await goodsApi.getCurrentQuantityAllGoods();
      console.log("res fetchCurrentQuantity: ", res);
      setGoodQuantity(res);
    };
    fetchQuantity();
  }, []);
  //console.log("goodQuantity: ", goodQuantity["Bia tiger"]);
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
    const invalidSelections = selectedGoods.filter(
      (item) => item.quantity > goodQuantity[item.name]
    );
    if (invalidSelections.length > 0) {
      message.error(
        `Số lượng sản phẩm "${
          invalidSelections[0].name
        }" đã chọn không được lớn hơn số lượng tồn (${
          goodQuantity[invalidSelections[0].name]
        })`
      );
    } else {
      dispatch(setGoods(selectedGoods));
      next(selectedGoods);
    }
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
      title: "Số lượng bán",
      width: "15%",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,

      render: (_, record) => {
        if (goodQuantity[record.name] === undefined) {
          return <InputNumber disabled defaultValue={0} />;
        } else {
          return (
            <InputNumber
              defaultValue={selectedQuantities[record.code] || 1}
              min={1}
              onKeyPress={restrictInputToNumbers}
              onChange={(value) => handleQuantityChange(record, value)}
            />
          );
        }
      },
    },
    {
      title: "Số lượng tồn",
      dataIndex: "currentQuantity",
      key: "currentQuantity",
      width: "15%",
      render: (_, record) => goodQuantity[record.name] || 0,
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
