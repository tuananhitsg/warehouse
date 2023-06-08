// import { Button, notification, Space } from "antd";
// const close = () => {
//   console.log(
//     "Notification was closed. Either the close button was clicked or duration time elapsed."
//   );
// };
// const MovingInfoNotification = () => {
//   const [api, contextHolder] = notification.useNotification();
//   const onCancel = () => {
//     api.destroy();
//   };
//   const openNotification = () => {
//     const key = `open${Date.now()}`;
//     const btn = (
//       <Space>
//         <Button type="link" size="small" onClick={onCancel}>
//           Huỷ
//         </Button>
//       </Space>
//     );
//     api.open({
//       message: "Chọn kệ",
//       description:
//         'Chọn kệ để chuyển sản phẩm sang hoặc chọn "Huỷ" để hủy bỏ thao tác.',
//       btn,
//       key,
//       duration: 0,
//       onClose: close,
//     });
//   };
//   return (
//     <>
//       {contextHolder}
//       <Button type="primary" onClick={openNotification}>
//         Open the notification box
//       </Button>
//     </>
//   );
// };
// export default MovingInfoNotification;
import { notification, Space, Button } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const MovingInfoNotification = ({ setIsMovingBin, isMovingBin }) => {
  const [api, contextHolder] = notification.useNotification();
  const movedBin = useSelector((state) => state.wareHouseReducer.movingBin);
  const onCancel = () => {
    api.destroy();
    setIsMovingBin(false);
  };
  useEffect(() => {
    if (isMovingBin) {
      const key = `open${Date.now()}`;
      const btn = (
        <Space>
          <Button type="link" size="small" onClick={onCancel}>
            Huỷ di chuyển sản phẩm
          </Button>
        </Space>
      );
      api.open({
        message: "Chọn kệ",
        description: `Bạn đang chuyển ${movedBin.quantity} sản phẩm ${movedBin.goodsCode}:${movedBin.goodsName} từ kệ ${movedBin.fromBinLocationCode}.`,
        btn,
        key,
        duration: 0,
        placement: "topLeft",
        closeIcon: null,
      });
    } else {
      api.close(`open`);
    }
  }, [isMovingBin]);

  return <>{contextHolder}</>;
};

export default MovingInfoNotification;
