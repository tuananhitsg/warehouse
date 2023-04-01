import React, { useState, useEffect } from "react";
import ShelfItem from "../shelf/ShelfItem";
import "./Shelf.scss";
import wareHouserApi from "../../../../api/wareHouseApi";

const Shelf = ({ items, onShelfItemClick }) => {
  return (
    <div className="shelf">
      {items.map((item, index) => (
        <ShelfItem
          key={index}
          codeRow={item.codeRow}
          //status={item.status}
          status={item.codeRow} //hiênnj tạm xem vi tri
          shelf={item}
          onClick={() => onShelfItemClick(item.codeRow)}
          //onClick={onShelfItemClick}
        />
      ))}
    </div>
  );
};

export default Shelf;
