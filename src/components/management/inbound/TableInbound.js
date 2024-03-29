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
import { useNavigate, useLocation } from "react-router-dom";
// import "./table.scss";
//import component
import ModalAddReceipt from "./modalAddReceipt";
import TableReceipt from "./TableReceiptDetail";

const InboundTable = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showModalGoodsDetail, setShowModalGoodsDetail] = useState(false);
  const [showModalAddReceipt, setShowModalAddReceipt] = useState(false);
  const [showModalConfirmPut, setShowModalConfirmPut] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listReceipt, setListReceipt] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  //reload trang sau khi them
  const reload = useSelector((state) => state.reloadReducer.reload);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  //get good list
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await InboundApi.getAllReceipt();
  //       if (res) {
  //         setListReceipt(res);
  //       }
  //     } catch (error) {
  //       console.log("Failed to fetch recepit list: ", error);
  //     }
  //   };
  //   fetchData();
  // }, [reload]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      page: 0,
      pageSize: 5,
    },
  });
  //get all purchase receipt
  const [listPurchase, setListPurchase] = useState([]);
  const fetchAllPurchases = async () => {
    try {
      const res = await InboundApi.getAllPurchaseReceipt();
      if (res) {
        setListPurchase(res);
      }
    } catch (error) {
      console.log("Failed to fetch recepit list: ", error);
    }
  };
  const fetchPageOfData = async () => {
    const { page, pageSize } = tableParams.pagination;
    console.log("page", page, pageSize);

    try {
      const res = await InboundApi.getPageOfReceipt(page, pageSize);
      // navigate(`/danh-sach-phieu-nhap?page=${page + 1}&size=${pageSize}`);
      navigate(`${location.pathname}?page=${page+1}&size=${pageSize}`);
      if (res) {
        const { content, totalElements } = res;
        setListReceipt(content);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: totalElements,
          },
        });
        console.log("respage", res);
      }
    } catch (error) {
      console.log("Failed to fetch page: ", error);
    }
  };
  useEffect(() => {
    fetchPageOfData();
  }, [tableParams.pagination.current, reload]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination: {
        ...pagination,
        page: pagination.current - 1,
      },
    });
    // navigate(
    //   `/danh-sach-phieu-nhap?page=${pagination.current}&size=${pagination.pageSize}`
    // );
    navigate(
      `${location.pathname}?page=${pagination.current}&size=${pagination.pageSize}`
    );
    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setListReceipt([]);
    }
  };
  const handleInbound = async () => {
    try {
      const res = await InboundApi.putGoodsIntoShelf(selectedId);
      console.log("res inbound:", res);
      if (res) {
        message.success("Nhập kho thành công");
        dispatch(setReload(!reload));
      }
    } catch (error) {
      console.log("Failed to put goods: ", error);
      message.error("Nhập kho thất bại");
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
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
      width: "20%",
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
      title: "Hành động",
      key: "action",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => showModalConfirm(record.code)}
            type="primary"
            icon={<LoginOutlined />}
          />
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setShowModalConfirmPut(false);
    setSelectedId(null);
  };
  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.code] : []);
    setSelectedId(record.code);
  };
  return (
    <div className="table-container">
      <div className="table-header">
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
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
        columns={columns}
        pagination={{ ...tableParams.pagination }}
        rowKey={(record) => record.code}
        expandable={{
          expandedRowRender: (record) => <TableReceipt record={record} />,
          //expandRowByClick: true,
          onExpand: handleExpand,
        }}
        dataSource={listReceipt}
        onChange={handleTableChange}
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
          <p>Bạn muốn nhập kho phiếu nhập {selectedId}?</p>
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

export default InboundTable;
