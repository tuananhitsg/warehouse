import {
  Space,
  Input,
  Table,
  Button,
  Modal,
  Form as FormAntd,
  Row,
  Col,
  message,
  Select,
  InputNumber,
} from "antd";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FastField,
  useFormik,
} from "formik";

import wareHouseApi from "../../../../api/wareHouseApi";
import Shelf from "../../warehouse/shelf/Shelf";
import ModalShelfInfo from "../../warehouse/ModalShelfInfo";
import SelectingBin from "./SelectingBin";
import * as Yup from "yup";

//test
import Warehouse from "../../warehouse/Warehouse";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWareHouse, setUsableBin } from "../../../../redux/wareHouseSlice";
import { Padding } from "@mui/icons-material";
import { setBinCode, setReceipt } from "../../../../redux/inboundSlice";
import wareHouserApi from "../../../../api/wareHouseApi";
const SelectingWarehouse = ({ next, show, setShow, setIsPicked }) => {
  const [wareHouseOption, setWareHouseOption] = useState([]);
  const [wareHouseCode, setWareHouseCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [bins, setBins] = useState([]);
  const [visible, setVisible] = useState(false);
  const [purchaseReceipt, setPurchaseReceipt] = useState(null);
  const [showSelectedBin, setShowSelectedBin] = useState(false);
  const [usableBin, setUsableBin] = useState([]);
  const dispatch = useDispatch();
  const record = useSelector((state) => state.inboundReducer.goods);
  console.log("record", record);
  const selectedBin = useSelector((state) => state.inboundReducer.binCode);

  //test
  const [warehouseMap, setWarehouseMap] = useState(false);

  console.log("record code", record.code);
  // const selectBin = {
  //   initial: {
  //     quantity: "",
  //     codeWarehouse: "",
  //     quantityRemaining: record.quantityRemaining,
  //   },
  //   validationSchema: Yup.object().shape({
  //     quantity: Yup.number()
  //       .required("Chưa nhập số lượng.")
  //       .min(1, "Số lượng phải lớn hơn 0.")
  //       .max(
  //         Yup.ref("quantityRemaining"),
  //         "Số lượng vượt quá số lượng còn lại."
  //       ),
  //     codeWarehouse: Yup.string().required("Chưa chọn kho."),
  //   }),
  // };

  //const handleSubmit = async (values, { setSubmitting, resetForm }) => {};

  const fetchWarehouse = async () => {
    try {
      const response = await wareHouseApi.getAllWareHouse();
      setWareHouseOption(response);
      console.log("warehouse trong modal", response);
    } catch (error) {
      console.log(error);
      message.error("Lấy dữ liệu kho thất bại");
    }
  };
  useEffect(() => {
    fetchWarehouse();
    //handleSearchUsableBin();
  }, []);

  const restrictInputToNumbers = (event) => {
    const numericKeys = /[0-9]/;
    if (!numericKeys.test(event.key)) {
      event.preventDefault();
    }
  };

  const showFormInbound = async (values) => {
    console.log("values", values);
    setQuantity(parseInt(values.quantity, 10));
    const params = {
      codeGoods: record.code,
      quantity: parseInt(values.quantity, 10),
    };
    console.log("params", params);
    // dispatch(
    //   setUsableBin({ codeWarehouse: values.warehouseCode, params: params })
    // );
    try {
      const res = await wareHouserApi.getUsableBin(
        values.warehouseCode,
        params
      );
      console.log("Usable: ", res);
      if (res.length === 0) {
        message.warning("Không tìm thấy kệ khả dụng cho số lượng hàng này");
      } else {
        setVisible(true);
        res?.sort((a, b) => a.id - b.id);
        // setShelves(res);
        setUsableBin(res);
      }
    } catch (error) {
      console.log("Fetch error: ", error.response);
      if (error.response.data.statusCode === 400) {
        setTimeout(() => {
          message.warning(error.response.data.message);
        }, 3000);
        setVisible(false);
      } else {
        message.error("Lấy dữ liệu kệ thất bại");
        setVisible(false);
      }
    }
    setWarehouseMap({ codeWarehouse: values.warehouseCode, params: params });
    // setVisible(true);
    //setWarehouseMap(true);
  };
  const handleNext = () => {
    //next();
    setShow(false);
    setIsPicked(true);
    dispatch(
      setReceipt({
        binLocationCode: selectedBin,
        quantity: quantity,
        goodsCode: record.code,
        codeWarehouse: wareHouseCode,
        name: record.name,
      })
    );
  };
  console.log("warehouse code", wareHouseCode);
  return (
    <>
      <div className="modal-inbound" style={{ backgroundColor: "white" }}>
        <FormAntd
          style={{ paddingTop: "10px", paddingLeft: "10px" }}
          onFinish={showFormInbound}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          <Row gutter={16}>
            <Col span={10}>
              <FormAntd.Item
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        value &&
                        value > 0 &&
                        value <= record.quantityRemaining
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Số lượng nhập không hợp lệ")
                      );
                    },
                  }),
                ]}
              >
                <Input
                  placeholder="Nhập số lượng"
                  style={{
                    width: "100%",
                  }}
                  onKeyPress={restrictInputToNumbers}
                  addonAfter={`/ ${record.quantityRemaining}`}
                />
              </FormAntd.Item>
            </Col>
            <Col span={10}>
              <FormAntd.Item
                label="Kho"
                name="warehouseCode"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn kho",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn kho"
                  options={wareHouseOption.map((item) => ({
                    value: item.code,
                    label: item.name,
                  }))}
                  onChange={(value) => {
                    setVisible(false);
                    setWareHouseCode(value);
                    dispatch(setWareHouse(value));
                    dispatch(setBinCode(null));
                  }}
                />
              </FormAntd.Item>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                htmlType="submit"
                //onClick={showFormInbound}
              >
                Tìm vị trí khả dụng
              </Button>
            </Col>
          </Row>
          {showSelectedBin ? (
            <>
              <Row gutter={16}>
                <Col span={10}>
                  <FormAntd.Item label="Vị trí">
                    <Input name="binCode" value={selectedBin} disabled />
                  </FormAntd.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <FormAntd.Item>
                    <Button type="primary" onClick={handleNext()}>
                      Xác nhận
                    </Button>
                  </FormAntd.Item>
                </Col>
              </Row>
            </>
          ) : null}
          <Row>
            <Col span={24}>
              {visible ? (
                <Warehouse
                  isSelectingBin={true}
                  visible={visible}
                  setVisible={setVisible}
                  setShowSelectedBin={setShowSelectedBin}
                  params={warehouseMap}
                  usableBin={usableBin}
                />
              ) : null}
            </Col>
          </Row>
        </FormAntd>
      </div>
      {/* {visible ? (
        <SelectingBin
          visible={visible}
          setVisible={setVisible}
          bins={bins}
          setShowSelectedBin={setShowSelectedBin}
          showSelectedBin={showSelectedBin}
        />
      ) : null} */}
    </>
  );
};
export default SelectingWarehouse;
