import React, { useEffect, useState } from "react";
import { Button, Modal, Breadcrumb, Steps, theme } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// import PickingPartner from "./PickingPartner";
// import PickingGoods from "./PickingGoods";
import Confirmation from "./ConfirmInbound";
import PickingPurchasesReceipt from "./PickingPurchaseReceipt";
import SelectingGoods from "./SelectingGoods";
import SelectingWarehouse from "./SelectingWarehouse";
import InboundReSultPage from "../../../pages/InboundReSultPage";

import { setReceipt,resetReceipt } from "../../../../redux/inboundSlice";

import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
const InboundComponent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const partner = useSelector((state) => state.inboundReducer.info);
  const goods = useSelector((state) => state.inboundReducer.goods);
  const receipt = useSelector((state) => state.inboundReducer.receipt)
  const dispatch = useDispatch();
  console.log("current", current);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {
    if (!current === 2) {
      dispatch(resetReceipt());
    }
  }, [current]);
  const steps = [
    {
      title: "Chọn phiếu mua",
      content: <PickingPurchasesReceipt next={next} />,
    },
    {
      title: "Chọn sản phẩm",
      content: <SelectingGoods next={next} />,
    },
    // {
    //   title: "Chọn vị trí",
    //   content: <SelectingWarehouse next={next} />,
    // },
    {
      title: "Hoàn tất",
      content: isSuccess ? (
        <InboundReSultPage setIsSuccess={setIsSuccess} setCurrent={setCurrent} />
      ) : (
        <Confirmation next={next} setIsSuccess={setIsSuccess} isSale={true} />
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));
  const contentStyle = {
    minHeight: "260px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    //minHeight: "80vh",
  };
  console.log("isSuccess:", isSuccess);
  return (
    <>
      <div className="steps-bar-container">
        <Button
          style={{
            marginRight: "50px",
          }}
          onClick={() => prev()}
          disabled={current === 0}
          type="primary"
        >
          {<LeftOutlined />}
        </Button>
        <Steps className="step-bar" current={current} items={items} />
        {/* <Button
          style={{
            marginLeft: "50px",
          }}
          onClick={() => next()}
          disabled={current === steps.length - 1}
          type="primary"
        >
          {<RightOutlined />}
        </Button> */}
      </div>
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};
export default InboundComponent;
