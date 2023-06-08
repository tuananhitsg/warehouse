import "./table.scss";
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
import {
  CheckOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import employeeApi from "../../../api/employeeApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import { setUser } from "../../../redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

import ModalPartnerDetail from "./ModalPartnerDetail";
import ModalAddPartner from "./ModalAddPartner";
import partnerApi from "../../../api/partnerApi";
const { Search } = Input;
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
  const navigate = useNavigate();
  const location = useLocation();
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

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      page: 1,
      pageSize: 5,
    },
  });

  const fetchPageOfData = async () => {
    const { page, pageSize } = tableParams.pagination;
    console.log("page", page, pageSize);

    try {
      const res = await partnerApi.getPageOfPartner(page, pageSize);
      navigate(`${location.pathname}?page=${page}&size=${pageSize}`);
      if (res) {
        const { content, totalElements } = res;
        console.log("content", content);

        const data = content.map((item) => {
          return {
            ...item,
            address: `${item.address.street}, ${item.address.ward}, ${item.address.district}, ${item.address.province}`,
          };
        });

        console.log("data", data);
        setListPartner(data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: totalElements,
          },
        });
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
        page: pagination.current,
      },
    });
    navigate(
      `${location.pathname}?page=${pagination.current}&size=${pagination.pageSize}`
    );
    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setListPartner([]);
    }
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
  const handleRefresh = () => {
    setLoading(true);

    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
      setRefreshKey((oldKey) => oldKey + 1);
      dispatch(setReload(!reload));
      message.success("Tải lại thành công");
    }, 1000);
  };
  const [nameSearched, setNameSearched] = useState("");
  const onSearchName = async (e) => {
    // const name = nameSearched;
    const { page, pageSize } = tableParams.pagination;

    const res = await partnerApi.searchPartner(e, page, pageSize);
    if (res) {
      const { content, totalElements } = res;
      //setListGoods(content);
      const data = content.map((item) => {
        return {
          ...item,
          address: `${item.address.street}, ${item.address.ward}, ${item.address.district}, ${item.address.province}`,
        };
      });

      console.log("data", data);
      setListPartner(data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalElements,
        },
      });
    }
  };
  return (
    <div className="table-container">
      <div
        className="table-header"
        style={{
          marginBottom: 16,
        }}
      >
        <Row gutter={16} style={{ marginBottom: "10px", marginLeft: "10px" }}>
          <Col span={12}>
            <Search
              placeholder="Tìm kiếm đối tác"
              // onChange={(e) => {
              //   setNameSearched(e.target.value);
              // }}
              enterButton
              allowClear
              onSearch={onSearchName}
            />
          </Col>
          <Col span={12}>
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
        rowKey="code"
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (event) => {
        //       click(record);
        //     }, // click row
        //   };
        // }}
        pagination={{ ...tableParams.pagination }}
        //loading={loading}
        onChange={handleTableChange}
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
