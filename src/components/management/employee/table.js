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
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
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
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  //chhange active by clicking tag
  const [showModalChangeActive, setshowModalChangeActive] = useState(false);
  const onClose = () => {
    setshowModalChangeActive(false);
  };
  const handleshowModalChangeActive = (record) => {
    setshowModalChangeActive(true);
    setSelectedId(record.code);
    console.log("record", record);
  };
  const handleChangeActive = async () => {
    const res = await employeeApi.changeAccountStatus(selectedId);
    console.log("res", res);
    try {
      if (res.success) {
        onClose();
        message.success("Thay đổi trạng thái thành công!");
        dispatch(setReload(!reload));
      }
    } catch (err) {
      message.error("Thay đổi trạng thái thất bại!");
    }
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
      width: "25%",
      key: "email",
    },
    {
      title: "Giới tính",
      width: "15%",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Chức vụ",
      width: "15%",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "Trạng thái",
      dataIndex: "enabled",
      key: "enabled",
      render: (enabled, record) => {
        let color = "green";
        let name = "";
        if (enabled) {
          color = "green";
          name = "Kích hoạt";
        }
        if (!enabled) {
          color = "red";
          name = "Khoá";
        }
        return (
          <Tooltip placement="top" title={name}>
            <Tag
              color={color}
              key={Tooltip}
              onClick={() => handleshowModalChangeActive(record)}
              className="active-tag"
            >
              {name.toUpperCase()}
            </Tag>
          </Tooltip>
        );
      },
    },
  ];

  const convertRoleName = (roleName) => {
    if (roleName === "USER") {
      return "Nhân viên";
    } else if (roleName === "ADMIN") {
      return "Quản lý";
    } else {
      return roleName;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await employeeApi.getEmployee();
        if (res) {
          const data = res.map((item) => {
            return {
              key: item.code,
              ...item,
              roles: convertRoleName(item.roles[0].name),
            };
          });
          console.log(data);
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
              onClick={showModalAdd}
              loading={loading}
              icon={<UserAddOutlined />}
              style={{ marginLeft: "16px" }}
            >
              Tạo mới
            </Button>
            {/* <Button
              type="primary"
              onClick={handleRefresh}
              loading={loading}
              icon={<ReloadOutlined />}
              style={{ marginLeft: "8px" }}
            >
              Làm mới
            </Button> */}
          </Col>
        </Row>
      </div>
      <Table
        sticky
        columns={columns}
        dataSource={listCategory}
        pagination={{ pageSize: 5 }}
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
      {showModalChangeActive ? (
        <Modal
          title="Xác nhận đổi trạng thái tài khoản"
          open={showModalChangeActive}
          onCancel={onClose}
          footer={null}
          width={360}
        >
          <Row gutter={16} justify={"center"}>
            <Col>
              <Button onClick={onClose} className="form-field">
                Huỷ
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleChangeActive}
                className="form-field"
              >
                Xác nhận
              </Button>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </div>
  );
};

export default EmployeeTable;
