import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Button,
  Modal,
  Tag,
  message,
  Input,
  Col,
  Row,
  Badge,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import wareHouseApi from "../../../api/wareHouseApi";
import { useDispatch, useSelector } from "react-redux";
import { setWareHouse } from "../../../redux/wareHouseSlice";
import "./table.scss";
import Warehouse from "./Warehouse";
import ModalAddWareHouse from "./ModalAddWareHouse";
import { Link } from "react-router-dom";

const WarehouseTable = ({ setTab }) => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalAddWareHouse, setShowModalAddWareHouse] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();

  const reload = useSelector((state) => state.reloadReducer.reload);

  const showWarehouse = (e) => {
    setSelectedId(e);
  };
  const showModalAdd = () => {
    setShowModalAddWareHouse(true);
  };

  const onSelectChange = (selectedId) => {
    setSelectedRowKeys(selectedId);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClickCode = (id) => {
    console.log("id kho: ", id);
    dispatch(setWareHouse(id));
    setTab(1);
  };
  const columns = [
    {
      title: "Mã nhà kho",
      width: "15%",
      dataIndex: "code",
      key: "code",
      render: (text, record) => {
        return <a onClick={() => handleClickCode(record.code)}>{text}</a>;
      },
    },
    {
      title: "Tên nhà kho",
      width: "20%",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Diện tích (m2)",
      dataIndex: "acreage",
      key: "acreage",
    },
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
      render: (text, record) => {
        const { province, district, ward, address } = record.location;
        const locationStr = `${address}, ${ward}, ${district}, ${province}`;
        return <span>{locationStr}</span>;
      },
    },
   
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await wareHouseApi.getAllWareHouse();
        console.log("res:", res);
        if (res) {
          setListCategory(res);
        }
      } catch (error) {
        console.log("Failed to fetch warehouse list: ", error);
      }
    };
    fetchData();
  }, [reload]);
  const handleRefresh = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
      setRefreshKey((oldKey) => oldKey + 1);
      message.success("Tải lại thành công");
    }, 1000);
  };
  return (
    <div className="table-container">
      <div
        className="table-header"
        style={{
          marginBottom: 16,
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col span={12}>
            <Input
              placeholder="Tìm kiếm sản phẩm theo mã, tên"
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              onClick={showModalAdd}
              loading={loading}
              icon={<UserAddOutlined />}
              style={{ marginLeft: "16px" }}
            >
              Tạo mới
            </Button>
            <Button
              type="primary"
              onClick={handleRefresh}
              loading={loading}
              icon={<ReloadOutlined />}
              style={{ marginLeft: "8px" }}
            >
              Làm mới
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        sticky
        columns={columns}
        dataSource={listCategory}
        pagination={{ pageSize: 10 }}
      />
      {showModalAddWareHouse ? (
        <ModalAddWareHouse
          showModalAddWareHouse={showModalAddWareHouse}
          setShowModalAddWareHouse={setShowModalAddWareHouse}
        />
      ) : null}
    </div>
  );
};

export default WarehouseTable;
