import React, { useState, useEffect } from "react";

import { Space, Table, Button, Modal, Tag, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import employeeApi from "../../../api/employeeApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import "./table.scss";
import ModalEmployeeDetail from "./modalEmployeeDetail";
import ModalAddEmployee from "./modalAddEmployee";

const EmployeeTable = () => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalEmployeeDetail, setShowModalEmployeeDetail] = useState(false);
  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();

  const reload = useSelector((state) => state.reloadReducer.reload);

  const showModalDetail = (e) => {
    setShowModalEmployeeDetail(true);
    setSelectedId(e);
  };
  const showModalAdd = () => {
    setShowModalAddEmployee(true);
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
      title: "Mã nhân viên",
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
      title: "Họ và tên",
      width: "20%",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
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
        const res = await employeeApi.getEmployee();
        if (res) {
          const data = res.map((item) => {
            return {
              key: item.code,
              ...item,
              role:item.roles.name,       
            };
          });
          setListCategory(data.reverse());
        }
      } catch (error) {
        console.log("Failed to fetch employee list: ", error);
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
      <div
        className="table-header"
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={showModalAdd}
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
        dataSource={listCategory}
        pagination={{ pageSize: 6 }}
        scroll={{ y: 350 }}
      />
      {showModalEmployeeDetail ? (
        <ModalEmployeeDetail
          showModalEmployeeDetail={showModalEmployeeDetail}
          setShowModalEmployeeDetail={setShowModalEmployeeDetail}
          selectedId={selectedId}
        />
      ) : null}
      {showModalAddEmployee ? (
        <ModalAddEmployee
          showModalAddEmployee={showModalAddEmployee}
          setShowModalAddEmployee={setShowModalAddEmployee}
        />
      ) : null}
    </div>
  );
};

export default EmployeeTable;