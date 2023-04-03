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
} from "antd";
import wareHouseApi from "../../../api/wareHouseApi";

const ModalShelfInfo = ({ shelfCode, shelf, handleLogic }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [goods, setGoods] = useState([]);
  const [status, setStatus] = useState([]);

  // const handleOk = () => {

  //   const update = async (id, data) => {
  //     try {
  //       const response = await cinemaHallApi.updateShelf(
  //         id, data
  //       );
  //       if (response) {
  //         console.log("update success");
  //         setStatusShelfState(null)
  //         setStatusState(null)
  //          handleLogic();
  //       }
  //     } catch (error) {
  //       console.log("Featch erro: ", error);
  //     }
  //   };
  //   update(shelf.id, {status: statusState, statusShelf: statusShelfState});
  // };
  const handleCancel = () => {
    handleLogic();
  };

  useEffect(() => {
    // setGoods(shelf?.goods.name);
    // setStatus(shelf?.status);
    form.setFieldsValue({
      codeRow: shelf?.codeRow,
      codeColumn: shelf?.codeColumn,
      status: shelf?.status,
      code: shelf?.goods?.code,
      name: shelf.goods?.name,
      unit: shelf.goods?.unit,
      categoryName: shelf.goods?.categoryName,
    });
  }, [shelf, form]);
  console.log("shelf trong modal: ", shelf);
  return (
    <Drawer
      title="Thông tin kệ"
      open={isModalOpen}
      width={720}
      //onOk={handleOk}
      onClose={handleCancel}
      extra={
        <Space>
          <Button onClick={handleCancel}>Huỷ</Button>
          <Button type="primary" form="myForm" htmlType="submit">
            Xác nhận
          </Button>
        </Space>
      }
    >
      <Form form={form} id="myForm" layout="vertical">
        <Row>
          <Col span={4}>Vị trí:</Col>
          <Col span={20}>
            <Form.Item name="position" rules={[{ required: true }]}>
              <Input.Group compact>
                <Form.Item name={"codeColumn"} noStyle>
                  <Input
                    disabled={true}
                    style={{ width: "50%" }}
                    placeholder="Mã cột"
                  />
                </Form.Item>
                <Form.Item name={"codeRow"} noStyle>
                  <Input
                    disabled={true}
                    style={{ width: "50%" }}
                    placeholder="Mã hàng"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={4}>Trạng thái:</Col>
          <Col span={20}>
            <Form.Item
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>Sản phẩm:</Col>
          <Col span={20}>
            <Form.Item name="goods">
              <Input.Group>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="code" label="Mã sản phẩm">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="name" label="Tên sản phẩm">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="unit" label="Đơn vị">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="categoryName" label="Loại sản phẩm">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default ModalShelfInfo;
