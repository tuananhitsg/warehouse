import React, {useState, useEffect} from "react";
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
    notification
  } from "antd";
  import { useSelector } from "react-redux";
  import warehouseApi from "../../api/wareHouseApi";
import Shelf from './shelf';
  const arrCol = [1, 2, 3, 4, 5];
  const arrRow = [1,2,3];

  const WareHouse = () => {
    const [shelves, setShelves] = useState([]);
    const idWarehouse = useSelector((state) => state.warehouseId);

    useEffect(() => {
        const getShelves = async () => {
          try {
            const response = await warehouseApi.getShelvesById(
              idWarehouse
            );
            if (response) {
              setShelves(response);
            }
          } catch (error) {
            console.log("Featch erro: ", error);
          }
        };
        getShelves();
      }, [idWarehouse]);

      const renderShelves = () => {
        return shelves.map((shelf, index) => {
          return (
            <div key={index}>
              <Shelf
                shelfNumber={index}
                shelfWidth={shelf.width}
                shelfHeight={shelf.height}
                columnCount={shelf.column}
                rowCount={shelf.row}
              />
            </div>
          );
        });
      };

      return <div>{renderShelves()}</div>;
  }
