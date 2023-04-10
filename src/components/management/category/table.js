import React, { useState, useEffect } from "react";

import {
  Space,
  Table,
  Button,
  Input,
  Row,
  Col,
  Modal,
  Tag,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import categoryApi from "../../../api/categoryApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import "./table.scss";
import ModalCategoryDetail from "./modalCategoryDetail";
import ModalAddCategory from "./modalAddCategory";

const CategoryTable = () => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalCategoryDetail, setShowModalCategoryDetail] = useState(false);
  const [showModalAddCategory, setShowModalAddCategory] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();

  const reload = useSelector((state) => state.reloadReducer.reload);

  const showModalDetail = (e) => {
    setShowModalCategoryDetail(true);
    setSelectedId(e);
  };
  const showModalAdd = () => {
    setShowModalAddCategory(true);
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
      title: "Mã loại sản phẩm",
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
      title: "Tên loại sản phẩm",
      width: "20%",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      fix: "right",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryApi.getCategories();
        if (res) {
          const data = res.map((item) => {
            return {
              key: item.code,
              ...item,
            };
          });
          setListCategory(data.reverse());
        }
      } catch (error) {
        console.log("Failed to fetch category list: ", error);
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
      {showModalCategoryDetail ? (
        <ModalCategoryDetail
          showModalCategoryDetail={showModalCategoryDetail}
          setShowModalCategoryDetail={setShowModalCategoryDetail}
          selectedId={selectedId}
        />
      ) : null}
      {showModalAddCategory ? (
        <ModalAddCategory
          showModalAddCategory={showModalAddCategory}
          setShowModalAddCategory={setShowModalAddCategory}
        />
      ) : null}
    </div>
  );
};

export default CategoryTable;
