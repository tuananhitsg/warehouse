import React, { useEffect, useState } from "react";
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
  Form,
  Drawer,
  Space,
  message,
} from "antd";
import wareHouseApi from "../../../api/wareHouseApi";
import "./ModalShelfInfo.scss";
import MovingInfoNotification from "../../../utils/movingInfoNotification";
import ModalMovingGoods from "./ModalMovingGoods";
import { useDispatch, useSelector } from "react-redux";
import { setMovingBin } from "../../../redux/wareHouseSlice";
const ModalShelfInfo = ({
  shelfCode,
  shelf,
  handleLogic,
  setIsMovingBin,
  isMovingBin,
}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useDispatch();
  console.log("isMovingBin trong modal: ", isMovingBin);

  const [quantity, setQuantity] = useState("");
  const [isSelect, setIsSelect] = useState(false);

  const handleCancel = () => {
    handleLogic();
  };

  useEffect(() => {
    form.setFieldsValue({
      ...shelf,
      ...shelf.goods,
    });
  }, [shelf, form]);

  const handleMove = async () => {
    if (!quantity || parseInt(quantity) === 0) {
      return;
    }
    if (parseInt(quantity) > shelf.currentCapacity) {
      message.error(`Số lượng không được vượt quá ${shelf.currentCapacity}`);
      return;
    }
    console.log("binCode: ", shelfCode);
    setIsMovingBin(true);
    dispatch(
      setMovingBin({ fromBinLocationCode: shelfCode, quantity: quantity, goodsName: shelf.goods.name, goodsCode:shelf.goods.code })
    );
    handleCancel();
  };
  const handleSelect = async () => {
    console.log("binCode: ", shelfCode);
    setIsSelect(true);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const restrictInputToNumbers = (event) => {
    const numericKeys = /[0-9]/;
    if (!numericKeys.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <>
      <Drawer
        title="Thông tin vị trí "
        open={isModalOpen}
        width={720}
        //onOk={handleOk}
        onClose={handleCancel}
        footer={
          shelf.goods && !isMovingBin ? (
            <Space>
              <Form.Item>
                <Button
                  onClick={handleMove}
                  type="primary"
                  disabled={!quantity || parseInt(quantity) === 0}
                >
                  Di chuyển
                </Button>
              </Form.Item>
              <Form.Item>
                <Input
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="Nhập số lượng chuyển"
                  onKeyPress={restrictInputToNumbers}
                  addonAfter={shelf.currentCapacity}
                />
              </Form.Item>
            </Space>
          ) : isMovingBin ? (
            <Space>
              <Button onClick={handleSelect} type="primary">
                Chọn
              </Button>
            </Space>
          ) : null
        }
      >
        <Form
          form={form}
          id="myForm"
          layout="horizontal"
          labelAlign="left"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <Row>
            <Col span={24}>
              <Form.Item name="nameWarehouse" label="Tên kho">
                <Input readOnly bordered={false} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="position" label="Vị trí">
                <Space>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="codeBin" label="Mã kệ">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="nameShelf" label="Tên kệ">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="nameColumn" label="Cột">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="nameBin" label="Tầng">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="statusShelf" label="Tình trạng">
                <Space>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="currentCapacity"
                        label="Sức chứa hiện tại"
                      >
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="maxCapacity" label="Sức chứa tối đa">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="status" label="Trạng thái">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="goods" label="Sản phẩm">
                {shelf.goods ? (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="code" label="Mã sản phẩm">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="name" label="Tên sản phẩm">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="unit" label="Đơn vị">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="categoryName" label="Loại sản phẩm">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  "Trống"
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {/* {isMovingBin ? (
        <MovingInfoNotification
          setIsMovingBin={setIsMovingBin}
          isMovingBin={isMovingBin}
        />
      ) : null} */}
      {isSelect ? (
        <ModalMovingGoods
          isSelect={isSelect}
          setIsSelect={setIsSelect}
          selectedShelfCode={shelfCode}
          setIsMovingBin={setIsMovingBin}
        />
      ) : null}
    </>
  );
};
export default ModalShelfInfo;
