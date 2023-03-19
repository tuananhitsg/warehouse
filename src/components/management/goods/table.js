import React, { useState, useEffect } from "react";

import { Space, Table, Button, Modal, Tag, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import goodsApi from "../../../api/goodsApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import "./table.scss";
import ModalGoodsDetail from "./modalGoodsDetail";
import ModalAddGoods from "./modalAddGoods";

const GoodsTable = () => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalGoodsDetail, setShowModalGoodsDetail] = useState(false);
  const [showModalAddGoods, setShowModalAddGoods] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listGoods, setListGoods] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const reload = useSelector((state) => state.reloadReducer.reload);

  const showModalDetail = (e) => {
    setShowModalGoodsDetail(true);
    setSelectedId(e);
  };
  const showModalAdd = () => {
    setShowModalAddGoods(true);
  };
  const onSelectChange = (selectedId) => {
    setSelectedRowKeys(selectedId);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Mã sản phẩm",
      width: "15%",
      dataIndex: "code",
      key: "code",
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
      title: "Action",
      key: "action",
      fix: "right",
      with: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  //get good list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await goodsApi.getGoods();
        if (res) {
          const data = res.map((item) => {
            return {
              ...item,
              key: item.id,
            };
          });
          setListGoods(data.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reload]);
  

  const handleRefresh = () => {
    setIsLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setIsLoading(false);
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
        <Button
          type="primary"
          loading={isLoading}
          icon={<UserAddOutlined />}
          style={{ marginRight: "1rem" }}
          onClick={showModalAdd}
        >
          Thêm
        </Button>
        <Button
          type="primary"
          onClick={handleRefresh}
          loading={isLoading}
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
        dataSource={listGoods}
        pagination={{ pageSize: 6 }}
        scroll={{ y: 350 }}
      />
      {showModalGoodsDetail ? (
        <ModalGoodsDetail
          showModalGoodsDetail={showModalGoodsDetail}
          setShowModalGoodsDetail={setShowModalGoodsDetail}
          selectedId={selectedId}
        />
      ) : null}
      {showModalAddGoods ? (
        <ModalAddGoods
          showModalAddGoods={showModalAddGoods}
          setShowModalAddGoods={setShowModalAddGoods}
        />
      ) : null}
    </div>
  );
};

export default GoodsTable;
