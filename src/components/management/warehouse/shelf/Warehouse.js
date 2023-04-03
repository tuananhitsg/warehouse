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
} from "antd";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Shelf from "./Shelf";
import ModalShelfInfo from "../ModalShelfInfo";
import wareHouserApi from "../../../../api/wareHouseApi";
import "./Warehouse.scss";
import { useSelector } from "react-redux";


const Warehouse = () => {
  const WareHouseId = useSelector((state) => state.wareHouseReducer.info);
  console.log("WareHouseId: ", WareHouseId);
  const [shelves, setShelves] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [selectedShelfCode, setSelectedShelfCode] = useState(null);
  
  useEffect(() => {
    const getShevles = async () => {
      try {
        const res = await wareHouserApi.getShelvesByWarehouseId(WareHouseId);
        console.log("shelves: ", res);
        if (res) {
          setShelves(res);
        }
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    };
    getShevles();
  }, []);
  const handleOpenModal = async (shelfCode) => {
    const getShelfById = async (id) => {
      try {
        const res = await wareHouserApi.getRowById(shelfCode);
        console.log("Row: ", res);
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
  const handleModalLogic = () => {
    setOpen(false);
  };

  return (
    <div className="warehouse-site-wrapper">
      <div className="warehouse-site-layout-header">
        <Shelf items={shelves} onShelfItemClick={handleOpenModal} />
      </div>
      {/* {open ? <ModalShelfInfo /> : null} */}
      {open && (
        <ModalShelfInfo
          shelfCode={selectedShelfCode}
          shelf={selectedShelf}
          handleLogic={handleModalLogic}
        />
      )}
    </div>
  );
};
export default Warehouse;
