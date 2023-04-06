import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Select, Badge, Tag } from "antd";
import{RightOutlined} from "@ant-design/icons";

import InboundApi from "../../../api/inboundApi";

const ReceiptTable = ({record}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [receiptList, setReceiptList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [listReceipt, setListReceipt] = useState([]);

    const columns = [
        {
            title: "Loại sản phẩm",
            dataIndex: "categoryName",
            key: "categoryName"
        },
        {
            title:"Tên sản phẩm",
            dataIndex:"name",
            key:"name"
        },
        {
            title: "Đơn vị",
            dataIndex: "unit",
            key: "unit"
        },

    ]
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await InboundApi.getAllReceipt(record.id);
    //             setReceiptList(response.data);
    //         } catch (error) {
    //             console.log("Failed to fetch receipt detail list: ", error);
    //         }
    //     }
    // }, []);
}
export default ReceiptTable;    