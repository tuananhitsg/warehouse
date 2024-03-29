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
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import wareHouseApi from "../../../api/wareHouseApi";
import { useDispatch, useSelector } from "react-redux";
import { setWareHouse } from "../../../redux/wareHouseSlice";
import "./table.scss";
import Warehouse from "./Warehouse";
import ModalAddWareHouse from "./ModalAddWareHouse";
import ModalWarehouseDetail from "./ModalWarehouseDetail";
import { Link } from "react-router-dom";
import AuthService from "../../../service/auth.service";

const WarehouseTable = ({ setTab }) => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalAddWareHouse, setShowModalAddWareHouse] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);

  const isAdmin = AuthService.getUser().roles.includes("ADMIN");

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
  const showModalDetail = (e) => {
    setVisible(true);
    setSelectedId(e);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Mã nhà kho",
      width: "15%",
      dataIndex: "code",
      key: "code",
      render: (text, record) => {
        return <a onClick={() => showModalDetail(record.code)}>{text}</a>;
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
      title: "Thể tích (m3)",
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        let text = "";
        switch (status) {
          case "AVAILABLE":
            color = "green";
            text = "Đang hoạt động";
            break;
          case "FULL":
            color = "red";
            text = "Ngừng hoạt động";
            break;
          default:
            color = "grey";
            text = "Trống";
            break;
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
      render: (text, record) => {
        const { province, district, ward, address } = record.location;
        const locationStr = `${address}, ${ward}, ${district}, ${province}`;
        return <span>{locationStr}</span>;
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Xem sơ đồ nhà kho">
            <Button
              type="primary"
              icon={<RightCircleOutlined />}
              onClick={() => handleClickCode(record.code)}
            />
          </Tooltip>
        </Space>
      ),
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
          {/* <Col span={12}>
            <Input
              placeholder="Tìm kiếm sản phẩm theo mã, tên"
              prefix={<SearchOutlined />}
            />
          </Col> */}
          <Col span={12}>
            {isAdmin ? (
              <Button
                type="primary"
                onClick={showModalAdd}
                loading={loading}
                icon={<UserAddOutlined />}
                style={{ marginLeft: "16px" }}
              >
                Tạo mới
              </Button>
            ) : null}
            {/* <Button
              type="primary"
              onClick={handleRefresh}
              loading={loading}
              icon={<ReloadOutlined />}
              style={{ marginLeft: "8px" }}
            >
              Làm mới
            </Button> */}
          </Col>
        </Row>
      </div>
      <Table
        sticky
        columns={columns}
        dataSource={listCategory}
        pagination={{ pageSize: 5 }}
      />
      {showModalAddWareHouse ? (
        <ModalAddWareHouse
          showModalAddWareHouse={showModalAddWareHouse}
          setShowModalAddWareHouse={setShowModalAddWareHouse}
        />
      ) : null}
      {visible ? (
        <ModalWarehouseDetail
          visible={visible}
          setVisible={setVisible}
          selectedId={selectedId}
        />
      ) : null}
    </div>
  );
};

export default WarehouseTable;
