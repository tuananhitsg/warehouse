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

  // const onSelectChange = (selectedIds, selectedRows) => {
  //   setSelectedRowKeys(selectedIds);
  //   setDisableSelectButton(false);
  //   console.log("selectedRows: ", selectedRows);
  //   const updatedSelectedRows = selectedRows.map((row) => ({
  //     ...row,
  //     quantity: selectedGoods.find((item) => item.code === row.code)?.quantity || 1,
  //   }));
  //   setSelectedGoods(updatedSelectedRows);
  // };

  // const handleQuantityChange = (record, value) => {
  //   console.log("value ", value);
  //   console.log("record ", record);

  //   const updatedSelectedRows = selectedGoods.map((item) => {
  //     if (item?.code === record?.code) {
  //       return { ...item, quantity: value };
  //     }
  //     return item;
  //   });

  //   setSelectedGoods(updatedSelectedRows);
  // };
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
          defaultValue={1}
          min={1}
          onChange={(value) => handleQuantityChange(record, value)}
        />
      ),
    },
  ];
  // const [quantity, setQuantity] = useState(1);

  // const updateSelectedGoods = (record, quantity) => {
  //   const existingRecordIndex = selectedGoods.findIndex((item) => item?.code === record?.code);
  //   if (existingRecordIndex > -1) {
  //     // Nếu sản phẩm đã tồn tại trong danh sách, cập nhật lại số lượng
  //     const updatedGoods = [...selectedGoods];
  //     updatedGoods[existingRecordIndex] = { ...record, quantity };
  //     setSelectedGoods(updatedGoods);
  //   } else {
  //     // Nếu sản phẩm chưa tồn tại trong danh sách, thêm mới sản phẩm đó vào danh sách
  //     setSelectedGoods([...selectedGoods, { ...record, quantity }]);
  //   }
  // };
  // const renderCell = (item) => {
  //   const editable = item.editable;
  //   return editable ? (
  //     <InputNumber
  //       defaultValue={item.quantity}
  //       min={1}
  //       max={1000}
  //       onChange={onCellChange(item.key, "quantity")}
  //     />
  //   ) : (
  //     item.quantity
  //   );
  // };
  // const quantities = selectedGoods.map((item) => item.quantity);
  // const onSaveClick = () => {
  //   const quantities = selectedGoods.map((item) => item.quantity);
  //   console.log("quantities: ", quantities);

  //   // TODO: update selectedGoods with new quantities
  // };
  // const updateSelectedGoods = (selectedGoods, quantities) => {
  //   return selectedGoods.map((item, index) => {
  //     return {
  //       ...item,
  //       quantity: quantities[index],
  //     };
  //   });
  // };
  return (
    <>
      <TableGoods
        disableSelectButton={disableSelectButton}
        rowSelection={rowSelection}
        click={handleClick}
        isPickingGoods={true}
        cols={columns}
      />

      {/* {isQuantityModal ? (
        <Modal
          title="Nhập số lượng"
          open={isQuantityModal}
          onOk={onModalOk}
          onCancel={() => setIsQuantityModal(false)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Form
            form={form}
            layout="horizontal"
            labelAlign="left"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
          >
            <FormItem label="Số lượng" name="quantity">
              <Input />
            </FormItem>
          </Form>
        </Modal>
      ) : null} */}
    </>
  );
};
export default PickingGoods;