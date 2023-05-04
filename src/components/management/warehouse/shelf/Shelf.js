import React, { useState, useEffect, useMemo } from "react";
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
  // const sortedItems = useMemo(() => {
  //   if (items.length === 0) {
  //     return items;
  //   }
  //   return items.sort((a, b) => a.codeRow.localeCompare(b.codeRow));
  // }, [items]);
  // const handleClick = (codeBin) => {
  //   onShelfItemClick(codeBin);
  // };
  // return (
  //   <div className="shelf">
  //     {sortedItems.map((item) => (
  //       <ShelfItem
  //         key={item.codeBin}
  //         codeRow={item.codeRow}
  //         status={item.status}
  //         shelf={item}
  //         onClick={() => handleClick(item.codeBin)}
  //       />
  //     ))}
  //   </div>
  // );
};

export default Shelf;
