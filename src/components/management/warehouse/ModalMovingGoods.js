import { Modal, Form, Input, Space, Button, message } from "antd";
import wareHouserApi from "../../../api/wareHouseApi";
import { useSelector, useDispatch } from "react-redux";
import { setReload } from "../../../redux/reloadSlice";
const ModalMovingGoods = ({
  isSelect,
  setIsSelect,
  selectedShelfCode,
  setIsMovingBin,
}) => {
  console.log("shelfCode: ", selectedShelfCode);
const dispatch = useDispatch();
  const movedBin = useSelector((state) => state.wareHouseReducer.movingBin);
  const reload = useSelector((state) => state.reloadReducer.reload);
  console.log("movedBin: ", movedBin);

  const [form] = Form.useForm();
  const onOk = async () => {
    const data = {
      toBinLocationCode: selectedShelfCode,
      quantity: parseInt(movedBin.quantity),
    };
    console.log("data: ", data, movedBin.fromBinLocationCode);
    try {
      const res = await wareHouserApi.moveGoodsToBin(
        movedBin.fromBinLocationCode,
        data
      );
      if (res) {
        message.success("Chuyển sản phẩm thành công");
        setIsSelect(false);
        setIsMovingBin(false);
        dispatch(setReload(!reload));
      }
    } catch (err) {
      console.log(err);
      message.error("Vui lòng chọn kệ cùng sản phẩm để chuyển");
    }
  };
  return (
    <Modal
      title="Xác nhận chuyển kệ"
      open={isSelect}
      width={360}
      onCancel={() => setIsSelect(false)}
      onOk={onOk}
      // footer={
      //   <Space>
      //     <Button onClick={() => setIsSelect(false)}>Huỷ</Button>
      //     <Button type="primary" onClick={() => setIsSelect(false)}>
      //       Xác nhận
      //     </Button>
      //   </Space>
      // }
    >
      {/* <Form form={form}>
        <Form.Item
          //name="quantity"
          label="Số lượng"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form> */}
    </Modal>
  );
};
export default ModalMovingGoods;
