import React, { useState, useEffect, useRef } from "react";
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
  InputNumber,
} from "antd";
import {
  UserAddOutlined,
  ReloadOutlined,
  CheckOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate, useLocation } from "react-router-dom";
import goodsApi from "../../../api/goodsApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
import "./table.scss";
import ModalGoodsDetail from "./modalGoodsDetail";
import ModalAddGoods from "./modalAddGoods";
const { Search } = Input;
const GoodsTable = ({
  disableSelectButton,
  rowSelection,
  click,
  cols,
  components,
  rowClassName,
  onCell,
  isPickGoods,
}) => {
  const [selectedId, setSelectedId] = useState([]);
  const [showModalGoodsDetail, setShowModalGoodsDetail] = useState(false);
  const [showModalAddGoods, setShowModalAddGoods] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listGoods, setListGoods] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const reload = useSelector((state) => state.reloadReducer.reload);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //search on column
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Làm trống
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //modal
  const showModalDetail = (e) => {
    setShowModalGoodsDetail(true);
    setSelectedId(e);
  };
  const showModalAdd = () => {
    setShowModalAddGoods(true);
  };
  const onSelectChange = (selectedId) => {
    setSelectedRowKeys(selectedId);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Mã sản phẩm",
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "categoryName",
      key: "categoryName",
      ...getColumnSearchProps("categoryName"),
    },
    {
      title: "Đơn vị",
      width: "10%",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Chiều dài (mét)",
      width: "12%",
      dataIndex: "length",
      key: "length",
    },
    {
      title: "Chiều rộng (mét)",
      width: "12%",
      dataIndex: "width",
      key: "width",
    },
    {
      title: "Chiều cao (mét)",
      width: "12%",
      dataIndex: "height",
      key: "height",
    },
  ];
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  //get good list
  // useEffect(() => {

  //   fetchAllData();
  // }, [reload]);
  const fetchAllData = async () => {
    try {
      const res = await goodsApi.getGoods();
      if (res) {
        setListGoods(res.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get page of good list
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      page: 0,
      pageSize: 5,
    },
  });

  const fetchPageOfData = async () => {
    const { page, pageSize } = tableParams.pagination;
    console.log("page", page, pageSize);

    try {
      const res = await goodsApi.getPageOfGoods(page, pageSize);
      navigate(`${location.pathname}?page=${page + 1}&size=${pageSize}`);
      if (res) {
        const { content, totalElements } = res;
        //setListGoods(content);
        setListGoods(content.map((item) => ({ ...item, quantity: 0 })));
        console.log("content", listGoods);
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

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination: {
        ...pagination,
        page: pagination.current - 1,
      },
    });
    navigate(
      `${location.pathname}?page=${pagination.current}&size=${pagination.pageSize}`
    );
    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setListGoods([]);
    }
  };

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
  const [loading, setLoading] = useState(false);
  const [nameSearched, setNameSearched] = useState("");
  const onSearchName = async () => {
    const name = nameSearched;
    const { page, pageSize } = tableParams.pagination;

    const res = await goodsApi.searchGoods(name, page, pageSize);
    if (res) {
      const { content, totalElements, numberOfElements } = res;
      //setListGoods(content);
      setListGoods(content.map((item) => ({ ...item, quantity: 0 })));
      console.log("content", listGoods);
      console.log("totalElements", res.totalElements);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalElements,
        },
      });
    }
  };
  useEffect(() => {
    fetchPageOfData();
  }, []);
  useEffect(() => {
    nameSearched ? onSearchName() : fetchPageOfData();
  }, [tableParams.pagination.current, reload]);
  return (
    <div className="table-container">
      <div className="table-header">
        <Row gutter={16} style={{ marginBottom: "10px", marginLeft: "10px" }}>
          <Col span={12}>
            <Search
              placeholder="Tìm kiếm sản phẩm"
              onChange={(e) => {
                setNameSearched(e.target.value);
              }}
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
          <Col span={12}>
            {rowSelection ? (
              <Button
                type="primary"
                disabled={disableSelectButton}
                onClick={click}
                loading={isLoading}
                icon={<CheckOutlined />}
                style={{ marginLeft: "16px" }}
              >
                Chọn
              </Button>
            ) : null}
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
        rowSelection={rowSelection ? rowSelection : null}
        sticky
        columns={cols ? cols : columns}
        dataSource={listGoods}
        //pagination={{ pageSize: 5 }}
        rowKey="code"
        components={components}
        rowClassName={rowClassName}
        pagination={{ ...tableParams.pagination }}
        onChange={handleTableChange}
        onCell={{ onCell }}
      />
      {showModalGoodsDetail ? (
        <ModalGoodsDetail
          showModalGoodsDetail={showModalGoodsDetail}
          setShowModalGoodsDetail={setShowModalGoodsDetail}
          selectedId={selectedId}
        />
      ) : null}
      {showModalAddGoods ? (
        <ModalAddGoods
          showModalAddGoods={showModalAddGoods}
          setShowModalAddGoods={setShowModalAddGoods}
        />
      ) : null}
    </div>
  );
};

export default GoodsTable;
