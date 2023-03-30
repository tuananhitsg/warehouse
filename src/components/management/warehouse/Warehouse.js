import { useState, useEffect } from "react";
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
  notification,
} from "antd";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import Shelf from "./Shelf";
import wareHouserApi from "../../../api/wareHouseApi";

const arrCol = ["CL0001", "CL0002", "CL0003", "CL0004", "CL0005"];
const arrRow = ["HL0001", "HL0002", "HL0003"];
const arrShelf = [
  "SS001",
  "SS002",
  "SS003",
  "SS004",
  "SS005",
  "SS006",
  "SS007",
  "SS008",
  "SS009",
  "SS0010",
  "SS0011",
  "SS0012",
  "SS0013",
  "SS0014",
  "SS0015",
  "SS0016",
];
const Warehouse = ({ setTab }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [shelf, setShelf] = useState([]);
  useEffect(() => {
    const getShevles = async () => {
      try {
        const res = await wareHouserApi.getAllRow();
        console.log("res: ", res);
        if (res) {
          setShelves(res);
        }
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    };
    getShevles();
  }, []);

  // const shelves = [
  //   {
  //     id: 1,
  //     items: [
  //       { id: 1, status: "available" },
  //       { id: 2, status: "available" },
  //       { id: 3, status: "available" },
  //       { id: 4, status: "full" },
  //       { id: 5, status: "available" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     items: [
  //       { id: 6, status: "full" },
  //       { id: 7, status: "available" },
  //       { id: 8, status: "available" },
  //       { id: 9, status: "full" },
  //       { id: 10, status: "available" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     items: [
  //       { id: 11, status: "full" },
  //       { id: 12, status: "available" },
  //       { id: 13, status: "available" },
  //       { id: 14, status: "full" },
  //       { id: 15, status: "available" },
  //     ],
  //   },
  //   // thêm các dãy kệ khác vào đây
  // ];
  //return (
  // <div className="shelves">
  //   {shelves.map((shelf) => (
  //     <Shelf key={shelf.id} items={shelf.items} />
  //   ))}
  // </div>
  // <div className="site-card-wrapper">
  //   <Row gutter={16}>
  //     <Col span={20}>
  //       <div className="shelf-row">
  //         {/* <div className="shelf-left">
  //           <span>STT</span>
  //           <span>HL0001</span>
  //           <span>HL0002</span>
  //           <span>HL0003</span>
  //       </div> */}
  //         <div className="shelf-item">
  //           <table id="shelves">
  //             <tr>
  //               {arrCol.map((item) => {
  //                 return <td>{item}</td>;
  //               })}
  //             </tr>
  //             <>
  //               {arrCol.map((val, index) => {
  //                 let number = 1;
  //                 let agg = 1;
  //                 const newArr = columns.filter((item) => {
  //                   if (item.code === val) {
  //                     return item;
  //                   }
  //                 });
  //                 return(
  //                   <>
  //                     <tr>
  //                       {newArr.map((item,index) => {
  //                         let temp = index +1;
  //                         if(item.code===val){
  //                           return(
  //                             <>
  //                             <Shelf key={item.id} items={item.items} />
  //                              </>
  //                           )
  //                         }
  //                       })}
  //                     </tr>
  //                   </>
  //                 )
  //               })}
  //             </>
  //           </table>
  //           <>
  //             <tr></tr>
  //           </>
  //         </div>
  //       </div>
  //     </Col>
  //   </Row>
  // </div>
  //);
  return (
    <div className="site-card-wrapper">
      <div
        className="warehouse-wrapper"
        style={{ minHeight: "100vh", background: "", padding: "1rem" }}
      >
        <Row gutter={16}>
          <div
            className="warehouse-container"
            style={{
              background: "",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Col span={20}>
              <div className="warehouse-block">
                <div className="warehouse-left">
                  <span>STT</span>
                  {[...Array(16)].map((_, i) => (
                    <span key={i}>SS00{i + 1}</span>
                  ))}
                </div>
                <table id="warehouse">
                  <tr>
                    {arrRow.map((item) => {
                      return <td>{item}</td>;
                    })}
                  </tr>
                  <>
                    {arrCol.map((value, index) => {
                      let number = 1;
                      let agg = 1;
                      const newArr = shelves.filter((item) => {
                        if (item.codeColumn === value) {
                          return item;
                        }
                      });
                      return (
                        <>
                          <tr>
                            {newArr.map((shelf, index) => {
                              let temp = index + 1;
                              if (shelf.codeColumn === value) {
                                return (
                                  <>
                                    <td>
                                      <span>
                                        <Inventory2OutlinedIcon />
                                      </span>
                                    </td>
                                  </>
                                );
                              }
                              return <td title={shelf+number}></td>;
                            })}
                          </tr>
                        </>
                      );
                    })}
                  </>
                </table>
              </div>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  );
};
export default Warehouse;
