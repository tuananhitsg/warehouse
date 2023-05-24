import { useState, useEffect } from "react";
import {
  Input,
  Col,
  Row,
  Typography,
  Button,
  Modal,
  Breadcrumb,
  DatePicker,
  Select,
  notification,
  Statistic,
  message,
  Popconfirm,
  Form,
} from "antd";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Shelf from "./shelf/Shelf";
import ModalShelfInfo from "./ModalShelfInfo";
import ModalMovingGoods from "./ModalMovingGoods";
import wareHouserApi from "../../../api/wareHouseApi";
import goodsApi from "../../../api/goodsApi";
import "./Warehouse.scss";
import { useSelector, useDispatch } from "react-redux";
import { setBinCode } from "../../../redux/inboundSlice";
import MovingInfoNotification from "../../../utils/movingInfoNotification";
const { Title } = Typography;
const Warehouse = ({
  setTab,
  isSelectingBin,
  visible,
  setVisible,
  setShowSelectedBin,
  params,
}) => {
  const WareHouseId = useSelector((state) => state.wareHouseReducer.info);
  console.log("WareHouseId: ", WareHouseId);
  //truyen tu phieu nhap
  const WareHouseCode = params?.codeWarehouse;
  const dataUseableBin = params?.params;
  console.log("params cho usableBin: ", params);
  // const params = useSelector(
  //   (state) => state.wareHouseReducer?.usableBin?.params
  // );
  const reload = useSelector((state) => state.reloadReducer.reload);
  const receipt = useSelector((state) => state.inboundReducer.receipt);
  const [shelves, setShelves] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [selectedShelfCode, setSelectedShelfCode] = useState(null);
  const [reportPos, setReportPos] = useState(null);
  const [isMovingBin, setIsMovingBin] = useState(false);
  const [goods, setGoods] = useState([]);
  const [goodsCode, setGoodsCode] = useState(null);
  const dispatch = useDispatch();
  const binLocationCodes = [];
  for (let i = 0; i < receipt?.length; i++) {
    binLocationCodes.push(receipt[i].binLocationCode);
  }
  console.log("binLocationCodes: ", binLocationCodes);
  const getGoods = async () => {
    try {
      const res = await goodsApi.getGoodsByWarehouseCode(WareHouseId);
      console.log("Goods: ", res);

      if (res) {
        setGoods(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  };
  useEffect(() => {
    getGoods();
  }, []);
  const getShevles = async () => {
    try {
      const res = await wareHouserApi.getShelvesByWarehouseId(WareHouseId);

      if (res) {
        res.sort((a, b) => a.id - b.id);
        setShelves(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  };
  useEffect(() => {
    getShelfReporter();
    params ? getUsableBin() : goodsCode ? getBinsByGoodsCode() : getShevles();
    //getShevles();
  }, [params, reload, goodsCode]);

  const getUsableBin = async () => {
    try {
      const res = await wareHouserApi.getUsableBin(
        WareHouseCode,
        dataUseableBin
      );
      console.log("Usable: ", res);
      if (res.length === 0) {
        message.warning("Không tìm thấy kệ khả dụng cho số lượng hàng này");
      } else {
        res?.sort((a, b) => a.id - b.id);
        setShelves(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      message.error("Lấy dữ liệu kệ khả dụng thất bại");
    }
  };
  const getShelfReporter = async () => {
    try {
      const res = await wareHouserApi.getReportStock(WareHouseId);
      console.log("Report: ", res);
      if (res) {
        setReportPos(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      message.error("Lấy dữ liệu report kệ thất bại");
    }
  };
  const total =
    (reportPos?.["AVAILABLE"] || 0) +
    (reportPos?.["EMPTY"] || 0) +
    (reportPos?.["FULL"] || 0);

  const getBinByStatus = async (status) => {
    try {
      const res = await wareHouserApi.getBinsByStatus(WareHouseId, status);
      console.log("Report: ", res);
      if (res) {
        res.sort((a, b) => a.id - b.id);
        setShelves(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      message.error("Lấy dữ liệu status kệ thất bại");
    }
  };
  const getBinsByGoodsCode = async () => {
    try {
      const res = await wareHouserApi.getBinByGoodsCode(goodsCode);
      console.log("Report: ", res);
      if (res) {
        res.sort((a, b) => a.id - b.id);
        setShelves(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
      message.error("Lấy dữ liệu kệ thất bại");
    }
  };

  const getShelfById = async (code) => {
    try {
      const res = await wareHouserApi.getBinById(code);
      if (res) {
        setSelectedShelf(res);
        setOpen(true);
        setSelectedShelfCode(code);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  };
  useEffect(() => {
    getShelfById(selectedShelfCode);
  }, [reload]);
  const handleOpenModal = async (shelfCode) => {
    getShelfById(shelfCode);
  };

  const handleSelectBin = async (shelfCode) => {
    setOpen(true);
    setSelectedShelfCode(shelfCode);
  };
  // const handleMovingBin = () => {
  //   setOpen(true);
  //   message.success("Nhập số lượng sản phẩm cần chuyển");
  // };
  const handleModalLogic = () => {
    setOpen(false);
  };

  const handleRouter = (value) => {
    setTab(0);
  };

  const onModalOk = () => {
    handleModalLogic();
    setVisible(false);
    setShowSelectedBin(true);
    message.success(
      `Chọn kệ thành công cho sản phẩm:  ${dataUseableBin.codeGoods}`
    );
    dispatch(setBinCode(selectedShelfCode));
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <>
      {!isSelectingBin ? (
        <div className="warehouse-header">
          <Breadcrumb
            items={[
              {
                title: <a onClick={handleRouter}>Quản lý kho</a>,
                key: "IndexWareHouse",
              },
              {
                title: "Sơ đồ nhà kho",
                key: "WareHouseDiagram",
              },
            ]}
          />
        </div>
      ) : null}
      <div className="warehouse-site-wrapper">
        <div className="warehouse-site">
          <Form.Item label="Lọc kệ theo sản phẩm">
            <Select
              virtual={false}
              showSearch
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={goods?.map((goods) => ({
                value: goods.code,
                label: goods.name,
              }))}
              onChange={(value) => {
                setGoodsCode(value);
              }}
              allowClear
              style={{ width: 200 }}
            />
          </Form.Item>
        </div>
        <div className="statistics-container">
          <div className="statistics">
            <Row gutter={16}>
              <Col span={6}>
                <div onClick={() => getShevles()}>
                  <Statistic
                    title="Tổng"
                    value={total}
                    valueStyle={{ color: "black" }}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div onClick={() => getBinByStatus("Còn chỗ")}>
                  <Statistic
                    title="Còn chỗ"
                    value={reportPos?.["AVAILABLE"]}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div onClick={() => getBinByStatus("Trống")}>
                  <Statistic
                    title="Trống"
                    value={reportPos?.["EMPTY"]}
                    valueStyle={{ color: "#bfbfbf" }}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div onClick={() => getBinByStatus("Đã đầy")}>
                  <Statistic
                    title="Đã đầy"
                    value={reportPos?.["FULL"]}
                    valueStyle={{ color: "#f5222d" }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="warehouse-map">
          <Shelf
            items={shelves}
            // onShelfItemClick={
            //   isSelectingBin ? handleSelectBin : handleOpenModal
            // }
            onShelfItemClick={
              isSelectingBin ? handleSelectBin : handleOpenModal
            }
            isSelectingBin={isSelectingBin ? true : false}
            disabled={binLocationCodes}
          
          />
        </div>
      </div>
      {isMovingBin ? (
        <MovingInfoNotification
          setIsMovingBin={setIsMovingBin}
          isMovingBin={isMovingBin}
        />
      ) : null}

      {isSelectingBin
        ? open && (
            <Modal
              width={360}
              open={open}
              onCancel={handleModalLogic}
              onOk={onModalOk}
            >
              <div className="modal-select-bin">Xác nhận chọn kệ?</div>
            </Modal>
          )
        : open && (
            <ModalShelfInfo
              shelfCode={selectedShelfCode}
              shelf={selectedShelf}
              handleLogic={handleModalLogic}
              setIsMovingBin={setIsMovingBin}
              isMovingBin={isMovingBin}
            />
          )}
    </>
  );
};
export default Warehouse;
