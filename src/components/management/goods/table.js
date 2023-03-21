import React, { useState, useEffect } from "react";

import {
  Space,
  Input,
  Table,
  Button,
  Modal,
  Tag,
  Row,
  Col,
  message,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
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
              key: item.code,
              ...item,
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
      <div className="table-header">
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
              loading={isLoading}
              icon={<UserAddOutlined />}
              style={{ marginLeft: "16px" }}
              onClick={showModalAdd}
            >
              Thêm
            </Button>
            <Button
              type="primary"
              onClick={handleRefresh}
              loading={isLoading}
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
        dataSource={listGoods}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 400 }}
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
