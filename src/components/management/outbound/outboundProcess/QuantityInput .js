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
// import SelectingBin from "./SelectingBin";
import * as Yup from "yup";

//test
import Warehouse from "../../warehouse/Warehouse";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWareHouse, setUsableBin } from "../../../../redux/wareHouseSlice";
import { setBinCode, setReceipt } from "../../../../redux/outboundSlice";

const SelectingWarehouse = ({ next, show, setShow }) => {
  const [wareHouseOption, setWareHouseOption] = useState([]);
  const [wareHouseCode, setWareHouseCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [bins, setBins] = useState([]);
  const [visible, setVisible] = useState(false);
  const [purchaseReceipt, setPurchaseReceipt] = useState(null);
  const [showSelectedBin, setShowSelectedBin] = useState(false);

  const dispatch = useDispatch();
  const record = useSelector((state) => state.outboundReducer.goods);
  // const selectedBin = useSelector((state) => state.inboundReducer.binCode);
  //test
  const [warehouseMap, setWarehouseMap] = useState(false);

  console.log("record code", record.code);
  const selectBin = {
    initial: {
      quantity: "",
      codeWarehouse: "",
      quantityRemaining: record.quantityRemaining,
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number()
        .required("Chưa nhập số lượng.")
        .max(
          Yup.ref("quantityRemaining"),
          "Số lượng vượt quá số lượng còn lại."
        ),
      codeWarehouse: Yup.string().required("Chưa chọn kho."),
    }),
  };

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

  const handleSelectBins = async (values) => {
    //setWarehouseMap(true);
    // const params = {
    //   codeGoods: record.code,
    //   quantity: 26,
    // };
    // console.log("params", params);
    // try {
    //   console.log("warehouse code", wareHouseCode);
    //   const response = await wareHouseApi.getUsableBin(wareHouseCode, params);
    //   console.log("response", response);
    //   setBins(response);
    //   console.log("bins", bins);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const showFormInbound = async (values) => {
    console.log("values", values);
    setQuantity(parseInt(values.quantity, 10));
    const params = {
      goodCode: record.code,
      quantity: parseInt(values.quantity, 10),
    };
    console.log("params", params);
    dispatch(setReceipt(params));
    // dispatch(
    //   setUsableBin({ codeWarehouse: values.warehouseCode, params: params })
    // );
    //setWarehouseMap({ codeWarehouse: values.warehouseCode, params: params });
    setShow(false);
    //setWarehouseMap(true);
  };
  const handleNext = () => {
    //next();
    //setShow(false);
    dispatch(
      setReceipt({
        //binLocationCode: selectedBin,
        quantity: quantity,
        goodsCode: record.code,
        codeWarehouse: wareHouseCode,
      })
    );
  };
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
                      if (value && value <= record.quantityRemaining) {
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
            {/* <Col span={10}>
              <FormAntd.Item label="Kho" name="warehouseCode">
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
            </Col> */}
            <Col span={4}>
              <Button
                type="primary"
                htmlType="submit"
                //onClick={showFormInbound}
              >
                Xác nhận
              </Button>
            </Col>
          </Row>
          {/* {showSelectedBin ? (
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
          ) : null} */}
          {/* <Row>
            <Col span={24}>
              {visible ? (
                <Warehouse
                  isSelectingBin={true}
                  visible={visible}
                  setVisible={setVisible}
                  setShowSelectedBin={setShowSelectedBin}
                  params={warehouseMap}
                />
              ) : null}
            </Col>
          </Row> */}
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
