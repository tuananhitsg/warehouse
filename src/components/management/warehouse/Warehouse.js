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
import Shelf from "./shelf/Shelf";
import ModalShelfInfo from "./ModalShelfInfo";
import wareHouserApi from "../../../api/wareHouseApi";
import "./Warehouse.scss";

const arrCol = ["CL0001", "CL0002", "CL0003", "CL0004", "CL0005"];
const arrRow = ["HL0001", "HL0002", "HL0003"];
const arrShelf = [
  "SS001",
  "SS002",
  "SS003",
  "SS004",
  "SS005",
  "SS006",
  "SS007",
  "SS008",
  "SS009",
  "SS0010",
  "SS0011",
  "SS0012",
  "SS0013",
  "SS0014",
  "SS0015",
  "SS0016",
];
const Warehouse = ({ setTab }) => {
  const [shelves, setShelves] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [selectedShelfCode, setSelectedShelfCode] = useState(null);
  useEffect(() => {
    const getShevles = async () => {
      try {
        const res = await wareHouserApi.getAllRow();
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
          //possition={{`${selectedShelf.codeRow}-${selectedShelf.codeColumn}`}}
          handleLogic={handleModalLogic}
        />
      )}
    </div>
  );
};
export default Warehouse;
