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
  LoginOutlined,
} from "@ant-design/icons";

import InboundApi from "../../../api/inboundApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import "./table.scss";
import ModalGoodsDetail from "./modalGoodsDetail";
import ModalAddReceipt from "./modalAddReceipt";

const InboundTable = () => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalGoodsDetail, setShowModalGoodsDetail] = useState(false);
  const [showModalAddReceipt, setShowModalAddReceipt] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listReceipt, setListReceipt] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  //reload trang sau khi them
  const reload = useSelector((state) => state.reloadReducer.reload);
  const dispatch = useDispatch();

  const showModalDetail = (e) => {
    setShowModalGoodsDetail(true);
    setSelectedId(e);
  };
  const showModalAdd = () => {
    setShowModalAddReceipt(true);
  };
  const onSelectChange = (selectedId) => {
    setSelectedRowKeys(selectedId);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  //get good list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await InboundApi.getAllReceipt();
        console.log("res:", res);
        if (res) {
          setListReceipt(res);
        }
      } catch (error) {
        console.log("Failed to fetch recepit list: ", error);
      }
    };
    fetchData();
  }, [reload]);

  const handleInbound = async (id) => {
    try {
      const res = await InboundApi.putGoodsIntoShelf(id);
      console.log("res inbound:", res);
      if (res) {
        message.success("Nhập kho thành công");
        dispatch(setReload(!reload));
      }
    } catch (error) {
      console.log("Failed to put goods: ", error);
      message.error("Nhập kho thất bại");
    }
  };

  const columns = [
    {
      title: "Mã phiếu nhập",
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";

        if (status === "Chưa nhập lên kệ") {
          color = "error";
        } else {
          color = "cyan";
        }
        return (
          <Tag color={color} key={status}>
            {status?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Ngày nhập",
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate) => {
        const date = new Date(createDate);
        const formattedDate = date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedDate;
      },
    },
    {
      title: "Người nhập",
      dataIndex: "createdBy",
      key: "createdBy",
      width: "20%",
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "code",
      width: "10%",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => handleInbound(record.code)}
            type="primary"
            icon={<LoginOutlined />}
          />
        </Space>
      ),
    },
  ];

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
          </Col>
        </Row>
      </div>
      <Table
        sticky
        columns={columns}
        dataSource={listReceipt}
        pagination={{ pageSize: 10 }}
        // expandable={{
        //   expandedRowRender: (record) => ()
        // }}
      />
      {showModalGoodsDetail ? (
        <ModalGoodsDetail
          showModalGoodsDetail={showModalGoodsDetail}
          setShowModalGoodsDetail={setShowModalGoodsDetail}
          selectedId={selectedId}
        />
      ) : null}
      {showModalAddReceipt ? (
        <ModalAddReceipt
          showModalAddReceipt={showModalAddReceipt}
          setShowModalAddReceipt={setShowModalAddReceipt}
        />
      ) : null}
    </div>
  );
};

export default InboundTable;
