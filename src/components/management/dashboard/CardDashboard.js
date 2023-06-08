import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Row,
  Typography,
  Tooltip,
  Space,
  Card,
} from "antd";
import "./DashBoardStyle.scss";
import { LineChartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
// const CardDashboard = () => {
//   return (
//     <Card>
//       <Text className="card_title">Content in here</Text>
//       <div className="card_content">
//         <Text className="card_content_text">190.200.000</Text>
//         <div className="card_content-div">
//           <LineChartOutlined />
//           <span>59.3%</span>
//         </div>
//       </div>
//       <Text className="card_extra">You made an extra 35,000 this year</Text>
//     </Card>
//   );
// };
const CardDashboard_topGoodsEx = (data) => {
  console.log("data top1", data);
  return (
    <Card>
      <Text className="card_title">Top 1 hàng xuất</Text>
      <div className="card_content">
        <Text className="card_content_text">{data.data[0]?.name}</Text>
        <div className="card_content-div">
          <LineChartOutlined />
          <span>59.3%</span>
        </div>
      </div>
      <Text level="h3" className="card_extra">
        Số lượng:{" "}
        <span
          style={{
            color: "#1890ff",
            fontWeight: "bold",
          }}
        >
          {data.data[0]?.total ? data.data[0]?.total : 0}
        </span>
      </Text>
    </Card>
  );
};
const CardDashboard_topGoodsIm = (data) => {
  return (
    <Card>
      <Text className="card_title">Top 1 hàng nhập</Text>
      <div className="card_content">
        <Text className="card_content_text">{data.data[0]?.name}</Text>
        <div className="card_content-div">
          <LineChartOutlined />
          <span>59.3%</span>
        </div>
      </div>
      <Text level="h3" className="card_extra">
        Số lượng:{" "}
        <span
          style={{
            color: "#1890ff",
            fontWeight: "bold",
          }}
        >
          {data.data[0]?.total ? data.data[0]?.total : 0}
        </span>
      </Text>
    </Card>
  );
};

export { CardDashboard_topGoodsEx, CardDashboard_topGoodsIm };
