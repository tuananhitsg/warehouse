import React, { useState, useEffect } from "react";
import ShelfItem from "../shelf/ShelfItem";
import "./Shelf.scss";
import wareHouserApi from "../../../../api/wareHouseApi";

const Shelf = ({ items }) => {
  // const [status, setStatus] = useState("");
  // useEffect(() => {
  //   const getItem = async () => {
  //     try {
  //       const res = await wareHouserApi.getAllColumn();
  //       if (res) {
  //         console.log(res);
  //       }
  //     } catch (error) {
  //       console.log("Featch erro: ", error);
  //     }
  //   };
  // }, []);
  return (
    <div className="shelf">
      {items.map((item, index) => (
        <ShelfItem key={index} status={item.status} />
      ))}
    </div>
  );
};

export default Shelf;
