import { Modal } from "antd";
import wareHouseApi from "../../../../api/wareHouseApi";
import Shelf from "../../warehouse/shelf/Shelf";
import ModalShelfInfo from "../../warehouse/ModalShelfInfo";
import Warehouse from "../../warehouse/Warehouse";
import { setWareHouse, setUsableBin } from "../../../../redux/wareHouseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
const SelectingBin = ({ visible, setVisible, bins, showSelectedBin, setShowSelectedBin }) => {

  const dispatch = useDispatch();
  //test
  const [warehouseMap, setWarehouseMap] = useState(false);
  const onOk = () => {
    setVisible(false);
    setShowSelectedBin(true);
  }
  return (
    <>
      <Modal
        open={visible}
        width={1280}
        onCancel={() => setVisible(false)}
        onOk={onOk}
        title="Chọn kệ nhập"
      >
        <Warehouse isSelectingBin={true} visible={visible} setVisible={setVisible}/>
      </Modal>
    </>
  );
};
export default SelectingBin;
