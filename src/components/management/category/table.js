import React, { useState, useEffect } from "react";

import { Space, Table, Button, Modal, Tag, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import "./table.scss";
import ModalGoodsDetail from "./modalCategoryDetail";
const GoodsTable = () => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalGoodsDetail, setShowModalGoodsDetail] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();

  const reload = useSelector((state) => state.reload);

  const showModalDetail = (e) => {
    setShowModalGoodsDetail(true);
    setSelectedId(e);
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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "5%",
      render: (val) => {
        return (
          <a
            onClick={() => {
              showModalDetail(val);
            }}
          >
            {val}
          </a>
        );
      },
    },
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
      dataIndex: "category",
      key: "category",
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
      dataIndex: "wsize",
      key: "wsize",
    },
    {
      title: "Chiều rộng (mét)",
      width: "12%",
      dataIndex: "dsize",
      key: "dsize",
    },
    {
      title: "Chiều cao (mét)",
      width: "12%",
      dataIndex: "hsize",
      key: "hsize",
    },
    {
      title: "Action",
      key: "action",
      fix: "right",
      with: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      id:i+1,
      code: "SP001",
      name: "Nuoc suoi",
      category: "Nuoc uong",
      unit: "chai",
      wsize: "0.2",
      dsize: "0.2",
      hsize: "0.2",
    });
  }
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
      <div className="table-header"
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          //   onClick={handleDelete}
          //   disabled={!hasSelected}
          loading={loading}
          icon={<UserAddOutlined />}
          style={{ marginRight: "1rem" }}
        >
          Thêm
        </Button>
        <Button
          type="primary"
          onClick={handleRefresh}
          loading={loading}
          icon={<ReloadOutlined />}
          style={{ marginRight: "1rem" }}
        >
          Làm mới
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""} */}
        </span>
      </div>
      <Table
        sticky
        columns={columns}
        dataSource={data}
        // pagination={{ pageSize: 50 }}
        scroll={{ y: 350 }}
      />
      {showModalGoodsDetail ? (
        <ModalGoodsDetail
          showModalGoodsDetail={showModalGoodsDetail}
          setShowModalGoodsDetail={setShowModalGoodsDetail}
          selectedId={selectedId}
        />
      ) : null}
    </div>
  );
};

export default GoodsTable;
