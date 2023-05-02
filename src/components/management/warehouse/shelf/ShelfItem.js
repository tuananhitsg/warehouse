import React, { useState, useEffect } from "react";

const ShelfItem = ({ codeRow, status, shelf, onClick }) => {
  const [selectedShelf, setSelectedShelf] = useState(null);
  let className = "";
  switch (status) {
    case "Đã đầy":
      className = "shelf__item shelf__item--full";
      break;
    case "Còn chỗ":
      className = "shelf__item shelf__item--available";
      break;
    case "Trống":
      className = "shelf__item shelf__item--empty";
      break;
    default:
  }
  if (selectedShelf?.codeBin === shelf.codeBin) {
    className = `${className} selected-shelf`;
  } 
  // Thêm class "selected-shelf" nếu shelf được chọn
  // const onClickShelf = () => {
  //   setSelected(true);
  //   onClick(shelf.codeRow);
  // };
  return (
    <div
      className={className}
      onClick={() => {
        onClick(shelf.codeBin);
      }}
    >
      {status}:{shelf.codeBin}
    </div>
  );
};

export default ShelfItem;
