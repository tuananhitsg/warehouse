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
  LogoutOutlined,
} from "@ant-design/icons";

import OutboundApi from "../../../api/outboundApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import "./Table.scss";
import ModalAddReceipt from "./ModalAddDelivery";
const OutboundTable = () => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalGoodsDetail, setShowModalGoodsDetail] = useState(false);
  const [showModalAddReceipt, setShowModalAddReceipt] = useState(false);
  const [showModalConfirmPut, setShowModalConfirmPut] = useState(false);
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
  const showModalConfirm = (code) => {
    setShowModalConfirmPut(true);
    setSelectedId(code);
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
        const res = await OutboundApi.getAllDelivery();
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

  const handleInbound = async () => {
    try {
      const res = await OutboundApi.exportGoods(selectedId);
      console.log("res inbound:", res);
      if (res) {
        message.success("Xuất kho thành công");
        dispatch(setReload(!reload));
      }
    } catch (error) {
      console.log("Failed to export goods: ", error);
      message.error("Xuất kho thất bại");
    }
    setSelectedId(null);
    setShowModalConfirmPut(false);
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

        if (status === "Chưa xuất") {
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
      title: "Ngày tạo",
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
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
      width: "20%",
    },
    {
      title: "Hành động",
      key: "action",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => showModalConfirm(record.code)}
            type="primary"
            icon={<LogoutOutlined />}
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
  const handleCancel = () => {
    setShowModalConfirmPut(false);
    setSelectedId(null);
  };
  return (
    <div className="table-container">
      <div className="table-header">
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          {/* <Col span={12}>
            <Input
              placeholder="Tìm kiếm sản phẩm theo mã, tên"
              prefix={<SearchOutlined />}
            />
          </Col> */}
          <Col span={12}>
            <Button
              type="primary"
              loading={isLoading}
              icon={<UserAddOutlined />}
              style={{ marginLeft: "16px" }}
              onClick={showModalAdd}
            >
              Tạo mới
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        sticky
        columns={columns}
        dataSource={listReceipt}
        pagination={{ pageSize: 5 }}
        // expandable={{
        //   expandedRowRender: (record) => ()
        // }}
      />
      {showModalConfirmPut ? (
        <Modal
          title="Xác nhận nhập kho"
          onCancel={handleCancel}
          onOk={handleInbound}
          open={true}
          cancelText="Huỷ"
          okText="Xác nhận"
        >
          <p>Bạn muốn xuất kho phiếu nhập {selectedId}?</p>
        </Modal>
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

export default OutboundTable;
