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
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import OutboundApi from "../../../../api/outboundApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../../redux/reloadSlice";
import { useNavigate } from "react-router-dom";
import "../table.scss";
//import component
// import ModalAddReceipt from "../modalAddReceipt";
import TableSalesDetail from "./TableSalesDetail";

const TableSalesReceipt = ({ inboundCols, handleClick }) => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await OutboundApi.getAllSalesReceipts();
        if (res) {
          setListReceipt(res.reverse());
        }
      } catch (error) {
        console.log("Failed to fetch recepit list: ", error);
      }
    };
    fetchData();
  }, [reload]);
  console.log("listReceipt", listReceipt);

  const columns = [
    {
      title: "Mã phiếu bán",
      width: "15%",
      dataIndex: "code",
      key: "code",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => {
    //     let color = "green";
    //     let name = "";
    //     if (status === "NOT_DONE_YET") {
    //       color = "error";
    //       name = "Chưa hoàn thành";
    //     } else if (status === "DONE") {
    //       color = "cyan";
    //       name = "Đã hoàn thành";
    //     }

    //     return (
    //       <Tag color={color} key={name}>
    //         {name?.toUpperCase()}
    //       </Tag>
    //     );
    //   },
    // },

    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
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
      title: "Đối tác",
      dataIndex: "partner",
      key: "partner",

      render: (partner) => {
        return partner?.name;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "partner",
      key: "partner",
      width: "40%",
      render: (partner) => {
        return `${partner?.address?.street}, ${partner?.address?.ward}, ${partner?.address?.district}, ${partner?.address?.province}`;
      },
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
  const onDateChange = async (date, dateString) => {
    const res = await OutboundApi.searchSalesByDate(dateString);
    console.log("res", res);
    if (res) {
      setListReceipt(res);
    }
  };
  return (
    <div className="table-container">
     <div className="table-header">
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col span={12}>
            <DatePicker onChange={onDateChange} />
          </Col>
        </Row>
      </div>
      <Table
        columns={inboundCols ? inboundCols : columns}
        dataSource={listReceipt}
        // onChange={handleTableChange}
        // pagination={{ ...tableParams.pagination }}
        rowKey={(record) => record.code}
        expandable={{
          expandedRowRender: (record) => <TableSalesDetail record={record} />,
          expandRowByClick: true,
          onExpand: handleExpand,
        }}
        pagination={{
          defaultPageSize: 5,
        }}
      />
      {/* {showModalConfirmPut ? (
        <Modal
          title="Xác nhận nhập kho"
          onCancel={handleCancel}
          //onOk={handleInbound}
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
      ) : null} */}
    </div>
  );
};

export { TableSalesReceipt };
