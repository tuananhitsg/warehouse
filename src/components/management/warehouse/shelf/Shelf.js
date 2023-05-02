import React, { useState, useEffect } from "react";
import ShelfItem from "../shelf/ShelfItem";
import "./Shelf.scss";

const Shelf = ({ items, onShelfItemClick, isSelectingBin }) => {
  console.log("items", items);
  // const onClickShelfItem = (item) =>{
  //   is

  // }
  
  return (
    <div className="shelf">
      {items?.map((item, index) => (
        <ShelfItem
          key={index}
          codeRow={item.codeRow}
          status={item.status} //hiênnj tạm xem vi tri
          shelf={item}
          onClick={() => onShelfItemClick(item.codeBin)}
        />
      ))}
    </div>
  );
};

export default Shelf;
