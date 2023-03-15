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
const CardDashboard = () => {
  return (
    <Card>
      <Text className="card_title">Content in here</Text>
      <div className="card_content">
        <Text className="card_content_text">190.200.000</Text>
        <div className="card_content-div">
          <LineChartOutlined />
          <span>59.3%</span>
        </div>
      </div>
      <Text className="card_extra">You made an extra 35,000 this year</Text>
    </Card>
  );
};
export default CardDashboard;
