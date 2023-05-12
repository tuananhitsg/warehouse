import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import goodsApi from "../../../api/goodsApi";
import categoryApi from "../../../api/categoryApi";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import uploadApi from "../../../api/uploadApi";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
const ModalGoodsDetail = ({
  showModalGoodsDetail,
  setShowModalGoodsDetail,
  selectedId,
}) => {
  const [form] = Form.useForm();
  const [size, setSize] = useState("");
  const [categories, setCategories] = useState([]);
  const [imagePicker, setImagePicker] = useState([]);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.reloadReducer.reload);
  const onClose = () => {
    setShowModalGoodsDetail(false);
  };
  console.log("image", image);
  const handleSubmit = async (values) => {
    console.log("submit", values);
    console.log("imagePicker", imagePicker);
    const { categoryCode, categoryName, name, size, length, width, height } =
      values;
    console.log("values", values);
    // const formData = new FormData();
    // formData.append("file", image);
    // // const convertedImage = await convertImageToBase64(image);
    // const uploadRes = await uploadApi.upload(formData);
    // console.log("uploadRes", uploadRes);
    const data = {
      categoryCode,
      categoryName,
      name,
      length: parseFloat(length).toFixed(2),
      width: parseFloat(width).toFixed(2),
      height: parseFloat(height).toFixed(2),
      //image: uploadRes,
    };
    const res = await goodsApi.updateGoods(selectedId, data);
    if (res) {
      message.success("Cập nhật thành công");
      dispatch(setReload(!reload));
    }
  };

  const onChangeSize = async (value) => {
    setSize(value);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setImage(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  // const convertSize = (value) => {
  //   if (value === "1") {
  //     return "0.3x0.2x0.3";
  //   } else if (value === "2") {
  //     return "0.5x0.3x0.4";
  //   } else if (value === "3") {
  //     return "0.6x0.4x0.4";
  //   } else {
  //     return value;
  //   }
  // }

  useEffect(() => {
    console.log("selectedId", selectedId);
    const fetchData = async (id) => {
      try {
        const res = await goodsApi.getGoodsById(id);
        const resCate = await categoryApi.getCategories();
        console.log(res, resCate);
        if (res) {
          setImage(res.image);
          form.setFieldsValue({
            ...res,
            image: [
              {
                uid: "rc-upload-1681828335338-25",
                name: res.image,
                status: "done",
                url: res.image,
              },
            ],
            length: parseFloat(res.length).toFixed(2),
            width: parseFloat(res.width).toFixed(2),
            height: parseFloat(res.height).toFixed(2),
          });
          setCategories(resCate);
          // if (res.length === 0.3 && res.width === 0.2 && res.height === 0.3) {
          //   form.setFieldsValue({ size: "1" });
          // } else if (
          //   res.length === 0.5 &&
          //   res.width === 0.3 &&
          //   res.height === 0.4
          // ) {
          //   form.setFieldsValue({ size: "2" });
          // } else if (
          //   res.length === 0.6 &&
          //   res.width === 0.4 &&
          //   res.height === 0.4
          // ) {
          //   form.setFieldsValue({ size: "3" });
          // }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData(selectedId);
  }, []);
  const restrictInputToRealNumbers = (event) => {
    const numericKeys = /^[0-9]*\.?[0-9]*$/;
    if (!numericKeys.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <div className="modal-container">
      <div className="modal-header">
        <Drawer
          title="Chi tiết sản phẩm"
          width={720}
          onClose={onClose}
          open={showModalGoodsDetail}
          extra={
            <Space>
              <Button onClick={onClose}>Huỷ</Button>
              <Button type="primary" form="myForm" htmlType="submit">
                Xác nhận
              </Button>
            </Space>
          }
        >
          <Form
            form={form}
            id="myForm"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="code" label="Mã sản phẩm">
                  <Input disabled />
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
                <Form.Item name="categoryName" label="Loại sản phẩm">
                  <Select
                    options={categories.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="unit" label="Đơn vị">
                  <Select />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="shelves"
                  label="Kích cỡ sản phẩm"
                  rules={[{ required: true }]}
                >
                  <Space.Compact block>
                    <Form.Item name="length" noStyle>
                      <Input
                        style={{ width: "33%" }}
                        placeholder="Chiều dài sản phẩm(m)"
                        onKeyPress={restrictInputToRealNumbers}
                      />
                    </Form.Item>
                    <Form.Item name="width" noStyle>
                      <Input
                        style={{ width: "33%" }}
                        placeholder="Chiều rộng sản phẩm(m)"
                        onKeyPress={restrictInputToRealNumbers}
                      />
                    </Form.Item>
                    <Form.Item name="height" noStyle>
                      <Input
                        style={{ width: "33%" }}
                        placeholder="Chiều cao sản phẩm(m)"
                        onKeyPress={restrictInputToRealNumbers}
                      />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="image"
                  label="Hình ảnh"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="Chỉ chấp nhận file ảnh"
                  type="file"
                >
                  <Upload
                    name="logo"
                    customRequest={dummyRequest}
                    listType="picture"
                    maxCount={1}
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      setImagePicker(e.fileList[0]);
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};
export default ModalGoodsDetail;
