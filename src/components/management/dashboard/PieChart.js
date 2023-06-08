import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import statisticApi from "../../../api/statisticApi";
const PieChart = () => {
  const [dataPieChart, setDataPieChart] = useState([]);
  const fetchQtyImAndEx = async () => {
    const res = await statisticApi.getQtyImAndExInCurrentMonth();
    const dataArray = Object.keys(res).map((key) => {
      let type = "";
      if (key === "importedQuantity") {
        type = "Hàng nhập trong tháng";
      } else if (key === "exportedQuantity") {
        type = "Hàng xuất trong tháng";
      }
      return { type, value: res[key] };
    });
    setDataPieChart(dataArray);
  };
  useEffect(() => {
    fetchQtyImAndEx();
  }, []);
  console.log("data", dataPieChart);
  const config = {
    appendPadding: 10,
    data: dataPieChart,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
export default PieChart;
