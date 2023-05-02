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
} from "antd";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Shelf from "./shelf/Shelf";
import ModalShelfInfo from "./ModalShelfInfo";
import wareHouserApi from "../../../api/wareHouseApi";
import "./Warehouse.scss";
import { useSelector, useDispatch } from "react-redux";
import { setBinCode } from "../../../redux/inboundSlice";

const Warehouse = ({
  setTab,
  isSelectingBin,
  visible,
  setVisible,
  setShowSelectedBin,
}) => {
  const WareHouseId = useSelector((state) => state.wareHouseReducer.info);
  console.log("WareHouseId: ", WareHouseId);
  const params = useSelector((state) => state.wareHouseReducer.usableBin);
  console.log("Params: ", params);
  const [shelves, setShelves] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [selectedShelfCode, setSelectedShelfCode] = useState(null);
  const [reportPos, setReportPos] = useState(null);

  const dispatch = useDispatch();
  // const handleBackward = () => {
  //   setTab(0);
  // };

  const getShevles = async () => {
    try {
      const res = await wareHouserApi.getShelvesByWarehouseId(WareHouseId);

      if (res) {
        setShelves(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  };
  const getUsableBin = async () => {
    try {
      const res = await wareHouserApi.getUsableBin(WareHouseId, params);
      console.log("Usable: ", res);
      // if (res) {
      //   setShelves(res);
      // }
    } catch (error) {
      console.log("Fetch error: ", error);
      message.error("Lấy dữ liệu kệ thất bại");
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
  useEffect(() => {
    getShelfReporter();
    getShevles();
    getUsableBin();
  }, []);
  const handleOpenModal = async (shelfCode) => {
    const getShelfById = async (id) => {
      try {
        const res = await wareHouserApi.getBinById(shelfCode);
        if (res) {
          setSelectedShelf(res);
          setOpen(true);
          setSelectedShelfCode(shelfCode);
        }
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    };
    getShelfById(shelfCode);
  };
  const handleSelectBin = async (shelfCode) => {
    setOpen(true);
    setSelectedShelfCode(shelfCode);
  };
  const handleModalLogic = () => {
    setOpen(false);
  };
  const onModalOk = () => {
    handleModalLogic();
    setVisible(false);
    setShowSelectedBin(true);
    dispatch(setBinCode(selectedShelfCode));
  };
  return (
    <>
      <div className="warehouse-header">
        <Breadcrumb
          items={[
            {
              title: "Quản lý kho",
            },
            {
              title: "Sơ đồ nhà kho",
            },
          ]}
        />
      </div>
      <div className="warehouse-site-wrapper">
        <div className="statistics-container">
          <div className="statistics">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Còn chỗ"
                  value={reportPos?.["AVAILABLE"]}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Trống"
                  value={reportPos?.["EMPTY"]}
                  valueStyle={{ color: "#bfbfbf" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Đã đầy"
                  value={reportPos?.["FULL"]}
                  valueStyle={{ color: "#f5222d" }}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="warehouse-map">
          <Shelf
            items={shelves}
            onShelfItemClick={
              isSelectingBin ? handleSelectBin : handleOpenModal
            }
            isSelectingBin={isSelectingBin ? true : false}
          />
        </div>
      </div>
      {/* {open ? <ModalShelfInfo /> : null} */}
      {/* {isSelectingBin
        ? open ?? (
            <Modal title="Xác nhận chọn kệ">
              <div className="modal-select-bin">Xác nhận chọn kệ?</div>
            </Modal>
          )
        : open && (
            <ModalShelfInfo
              shelfCode={selectedShelfCode}
              shelf={selectedShelf}
              handleLogic={handleModalLogic}
            />
          )} */}
      {isSelectingBin
        ? open && (
            <Modal open={open} onCancel={handleModalLogic} onOk={onModalOk}>
              <div className="modal-select-bin">Xác nhận chọn kệ?</div>
            </Modal>
          )
        : open && (
            <ModalShelfInfo
              shelfCode={selectedShelfCode}
              shelf={selectedShelf}
              handleLogic={handleModalLogic}
            />
          )}
    </>
  );
};
export default Warehouse;
