import { Button, Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

import goodsApi from "../../../../api/goodsApi";
import { setReload } from "../../../../redux/reloadSlice";
import { useDispatch, useSelector } from "react-redux";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const PickingGoods = () => {
  const reload = useSelector((state) => state.reloadReducer.reload);
  const [listGoods, setListGoods] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await goodsApi.getGoods();
        if (res) {
          setListGoods(res.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reload]);
  const [dataSource, setDataSource] = useState([
    {
      code: "",
      name: "",
      age: "",
      address: "",

    },
  
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Mã sản phẩm",
      width: "15%",
      dataIndex: "code",
      key: "code",
      editable: true,
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
      width: "10%",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Chiều dài (mét)",
      width: "12%",
      dataIndex: "length",
      key: "length",
    },
    {
      title: "Chiều rộng (mét)",
      width: "12%",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "Chiều cao (mét)",
      width: "12%",
      dataIndex: "height",
      key: "height",
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Xoá</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Thêm sản phẩm
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={listGoods}
        columns={columns}
        rowKey={record => record._id}
      />
    </div>
  );
};
export default PickingGoods;
