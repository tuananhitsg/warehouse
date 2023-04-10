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
} from "antd";
import { CheckOutlined, UserAddOutlined } from "@ant-design/icons";

import employeeApi from "../../../api/employeeApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import { setUser } from "../../../redux/userSlice";

import "./table.scss";
import ModalPartnerDetail from "./ModalPartnerDetail";
import ModalAddPartner from "./ModalAddPartner";
import partnerApi from "../../../api/partnerApi";

const PartnerTable = ({
  disableSelectButton,
  rowSelection,
  click,
  buttonClick,
}) => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalPartnerDetail, setShowModalPartnerDetail] = useState(false);
  const [showModalAddPartner, setShowModalAddPartner] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listPartner, setListPartner] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();

  const reload = useSelector((state) => state.reloadReducer.reload);

  const showModalDetail = (e) => {
    setShowModalPartnerDetail(true);
    setSelectedId(e);
  };
  const showModalAdd = () => {
    setShowModalAddPartner(true);
  };

  const onSelectChange = (selectedId) => {
    setSelectedRowKeys(selectedId);
  };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  useEffect(() => {
    const fetchDataTable = async () => {
      try {
        const response = await partnerApi.getAll();
        setListPartner(response);
      } catch (error) {
        console.log("Failed to fetch data table: ", error);
        message.error("Lỗi tải dữ liệu");
      }
    };
    fetchDataTable();
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
  const columns = [
    {
      title: "Mã đối tác",
      dataIndex: "code",

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
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
  ];
  return (
    <div className="table-container">
      <div
        className="table-header"
        style={{
          marginBottom: 16,
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
          <Col span={24}>
            {rowSelection ? (
              <Button
                type="primary"
                disabled={disableSelectButton}
                loading={loading}
                icon={<CheckOutlined />}
                style={{ marginLeft: "16px" }}
                onClick={buttonClick}
              >
                Chọn
              </Button>
            ) : null}
            <Button
              type="primary"
              onClick={showModalAdd}
              loading={loading}
              icon={<UserAddOutlined />}
              style={{ marginLeft: "16px" }}
            >
              Tạo mới
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        rowSelection={rowSelection ? rowSelection : null}
        sticky
        columns={columns}
        dataSource={listPartner}
        pagination={{ pageSize: 10 }}
        rowKey="code"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              click(record);
            }, // click row
          };
        }}
        loading={loading}
      />
      {showModalPartnerDetail ? (
        <ModalPartnerDetail
          showModalPartnerDetail={showModalPartnerDetail}
          setShowModalPartnerDetail={setShowModalPartnerDetail}
          selectedId={selectedId}
        />
      ) : null}
      {showModalAddPartner ? (
        <ModalAddPartner
          showModalAddPartner={showModalAddPartner}
          setShowModalAddPartner={setShowModalAddPartner}
        />
      ) : null}
    </div>
  );
};

export default PartnerTable;
