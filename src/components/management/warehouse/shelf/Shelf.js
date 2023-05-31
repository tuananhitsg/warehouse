import React, { useState, useEffect, useMemo } from "react";
import ShelfItem from "../shelf/ShelfItem";
import "./Shelf.scss";

const Shelf = ({
  items,
  onShelfItemClick,
  isSelectingBin,
  disabled,
  goodsCodeinReceipt,
}) => {
  console.log("items", items);
  const handleShelfItemClick = (codeBin) => {
    onShelfItemClick(codeBin);
  };
  console.log("disable:", disabled, "goodsCodeinReceipt:", goodsCodeinReceipt);
  return (
    <div className="shelf">
      {items?.map((item, index) => (
        <ShelfItem
          key={index}
          codeRow={item.codeRow}
          status={item.status} //hiênnj tạm xem vi tri
          shelf={item}
          onClick={() => handleShelfItemClick(item.codeBin)}
          disabled={disabled}
          goodsCodeinReceipt={goodsCodeinReceipt}
          isSelectingBin={isSelectingBin}
        />
      ))}
    </div>
  );
};

export default Shelf;
