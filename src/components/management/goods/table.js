import { Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import './table.scss';
const goodsTable = (props) => {
    const columns = [
        {
            title: "Mã sản phẩm",
            width: "15%",
            dataIndex: "code",
            key: "code",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Đơn vị",
            width: "10%",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Chiều dài (mét)",
            width: "12%",
            dataIndex: "wsize",
            key: "wsize",
        },
        {
            title: "Chiều rộng (mét)",
            width: "12%",
            dataIndex: "dsize",
            key: "dsize",
        },
        {
            title: "Chiều cao (mét)",
            width: "12%",
            dataIndex: "hsize",
            key: "hsize",
        },
        {
            title: "Action",
            key: "action",
            fix: "right",
            with: "10%",
            render: (_, record) => (
                <Space size="middle">
                    <a>
                        <EditOutlined />
                    </a>
                    <a>
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
        },
    ];
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            code: "SP001",
            name: "Nuoc suoi",
            unit: "chai",
            wsize: "0.2",
            dsize: "0.2",
            hsize: "0.2",
        });
    }
    // const data = [
    //     {
    //         key: "1",
    //         code: "SP001",
    //         name: "Nuoc suoi",
    //         unit: "chai",
    //         wsize: "0.2",
    //         dsize: "0.2",
    //         hsize: "0.2",
    //     },
    //     {
    //         key: "2",
    //         code: "SP001",
    //         name: "Nuoc suoi",
    //         unit: "chai",
    //         wsize: "0.2",
    //         dsize: "0.2",
    //         hsize: "0.2",
    //     },
    //     {
    //         key: "3",
    //         code: "SP001",
    //         name: "Nuoc suoi",
    //         unit: "chai",
    //         wsize: "0.2",
    //         dsize: "0.2",
    //         hsize: "0.2",
    //     },
    // ];

  return (
      <div className="table-container">
        <Table
            sticky
            columns={columns}
            dataSource={data}
            // pagination={{ pageSize: 50 }}
            scroll={{ y: 450 }}
      />
      </div>
    );
};

export default goodsTable;
