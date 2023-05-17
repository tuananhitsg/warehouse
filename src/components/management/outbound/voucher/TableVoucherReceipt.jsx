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
  Tooltip,
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
  LoginOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import InboundApi from "../../../../api/inboundApi";
import OutboundApi from "../../../../api/outboundApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../../redux/reloadSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "../table.scss";
//import component
// import ModalAddReceipt from "./modalAddReceipt";
import TableReceipt from "./TableVoucherDetail";
const { Search } = Input;
const OutboundTable = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showModalGoodsDetail, setShowModalGoodsDetail] = useState(false);
  const [showModalCancelReceipt, setShowModalCancelReceipt] = useState(false);
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

  const showModalConfirm = (code) => {
    setShowModalConfirmPut(true);
    setSelectedId(code);
  };
  const showModalCancelVoucherReceipt = (code) => {
    setShowModalCancelReceipt(true);
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
      const res = await OutboundApi.getPageOfDelivery(page, pageSize);
      // navigate(`/danh-sach-phieu-nhap?page=${page + 1}&size=${pageSize}`);
      navigate(`${location.pathname}?page=${page + 1}&size=${pageSize}`);
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
      const res = await OutboundApi.exportGoods(selectedId);
      console.log("res inbound:", res);
      if (res) {
        message.success("Xuất kho thành công");
        dispatch(setReload(!reload));
      }
    } catch (error) {
      console.log("Failed to put goods: ", error);
      message.error("Xuất kho thất bại");
    }
    setSelectedId(null);
    setShowModalConfirmPut(false);
  };
  const handleCancelReceipt = async () => {
    try {
      const res = await OutboundApi.cancelDeliveryVoucher(selectedId);
      console.log("res cancel:", res);
      if (res) {
        message.success("Hủy phiếu xuất thành công");
        dispatch(setReload(!reload));
      }
    } catch (error) {
      console.log("Failed to cancel receipt: ", error);
      message.error("Hủy phiếu xuất thất bại");
    }
    setSelectedId(null);
    setShowModalCancelReceipt(false);
  };
  const columns = [
    {
      title: "Mã phiếu xuất",
      width: "15%",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        if (status === "Chưa xuất") {
          color = "error";
        } else if (status === "Đã xuất") {
          color = "cyan";
        } else if (status === "Đã hủy") {
          color = "default";
        }
        return (
          <Tag color={color} key={status}>
            {status?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Đơn vị nhận hàng",
      dataIndex: "partner",
      key: "partner",
      render: (partner) => {
        return partner.name;
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
          <Tooltip title="Xuất kho">
            <Button
              onClick={() => showModalConfirm(record.code)}
              type="primary"
              icon={<LogoutOutlined />}
              disabled={record.status !== "Chưa xuất"}
            />
          </Tooltip>
          <Tooltip title="Hủy phiếu xuất">
            <Button
              onClick={() => showModalCancelVoucherReceipt(record.code)}
              danger
              type="primary"
              icon={<CloseOutlined />}
              disabled={record.status !== "Chưa xuất"}
            />
          </Tooltip>
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

  const handleRefresh = () => {
    setLoading(true);

    // ajax request after empty completing
    setTimeout(() => {
      setLoading(false);
      setRefreshKey((oldKey) => oldKey + 1);
      dispatch(setReload(!reload));
      message.success("Tải lại thành công");
    }, 1000);
  };
  const [loading, setLoading] = useState(false);
  const [nameSearched, setNameSearched] = useState("");
  const onSearchName = async () => {
    const { page, pageSize } = tableParams.pagination;

    const res = await OutboundApi.searchDeliveryVoucher(
      page,
      pageSize,
      nameSearched,
      "",
      ""
    );
    if (res) {
      const { content, totalElements } = res;
      //setListGoods(content);
      // setListReceipt(content.map((item) => ({ ...item, quantity: 0 })));
      setListReceipt(content);
      console.log("content", listReceipt);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalElements,
        },
      });
    }
  };
  const [dateSearched, setDateSearched] = useState("");
  const onDateChange = async (date, dateString) => {
    console.log("dateString", dateString);
    const { page, pageSize } = tableParams.pagination;

    const res = await OutboundApi.searchDeliveryVoucher(
      page,
      pageSize,
      "",
      dateString,
      ""
    );
    if (res) {
      const { content, totalElements } = res;
      //setListGoods(content);
      // setListReceipt(content.map((item) => ({ ...item, quantity: 0 })));
      setListReceipt(content);
      console.log("content", listReceipt);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalElements,
        },
      });
    }
  }
  return (
    <div className="table-container">
      <div className="table-header">
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col span={12}>
            <Search
              placeholder="Tìm kiếm phiếu nhập theo mã"
              onChange={(e) => {
                setNameSearched(e.target.value);
              }}
              onClear={() => {
                onSearchName();
              }}
              enterButton
              allowClear
              onSearch={onSearchName}
            />
          </Col>
          <Col span={12}>
          <DatePicker onChange={onDateChange}/>
          </Col>
        </Row>
      </div>
      <Table
        columns={columns}
        pagination={{ ...tableParams.pagination }}
        rowKey={(record) => record.code}
        expandable={{
          expandedRowRender: (record) => <TableReceipt record={record} />,
          expandRowByClick: true,
          onExpand: handleExpand,
        }}
        dataSource={listReceipt}
        onChange={handleTableChange}
      />
      {showModalConfirmPut ? (
        <Modal
          title="Xác nhận xuất kho"
          onCancel={handleCancel}
          onOk={handleInbound}
          open={true}
          cancelText="Huỷ"
          okText="Xác nhận"
        >
          <p>Bạn muốn xuất kho phiếu: {selectedId}?</p>
        </Modal>
      ) : null}

      {showModalCancelReceipt ? (
        <Modal
          title="Xác nhận huỷ phiếu nhập"
          onCancel={handleCancel}
          onOk={handleCancelReceipt}
          open={true}
          cancelText="Huỷ"
          okText="Xác nhận"
        >
          <p>Bạn muốn huỷ phiếu nhập {selectedId}?</p>
        </Modal>
      ) : null}
    </div>
  );
};

export { OutboundTable };
