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
import "./ModalShelfInfo.scss";
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
    form.setFieldsValue({
      ...shelf,
      ...shelf.goods,
    });
  }, [shelf, form]);

  console.log("shelf trong modal: ", shelf);
  return (
    <Drawer
      title="Thông tin vị trí "
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
          <Col span={4}>Tên kho chứa:</Col>
          <Col span={20}>
            <Form.Item name="nameWarehouse">
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col span={4}>Vị trí:</Col>
          <Col span={20}>
            <Form.Item name="position" rules={[{ required: true }]}>
              <Space>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="codeBin" label="Mã kệ">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="nameShelf" label="Tên kệ">
                      <Input readOnly />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name="nameColumn" label="Cột">
                      <Input readOnly bordered />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="nameBin" label="Tầng">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                </Row>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>Tình trạng:</Col>
          <Col span={20}>
            <Form.Item name="statusShelf">
              <Space>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="currentCapacity" label="Sức chứa hiện tại">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="maxCapacity" label="Sức chứa tối đa">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="status" label="Trạng thái">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                </Row>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>Sản phẩm:</Col>
          <Col span={20}>
            {shelf.goods ? (
              <Form.Item name="goods">
                <Space>
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
                  </Row>
                  <Row gutter={16}>
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
                </Space>
              </Form.Item>
            ) : "Trống"}
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default ModalShelfInfo;
