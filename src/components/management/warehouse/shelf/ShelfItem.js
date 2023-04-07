import React, { useState, useEffect } from "react";

const ShelfItem = ({ codeRow, status, shelf, onClick }) => {
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

  return (
    <div className={className} onClick={() => onClick(shelf.codeRow)}>
      {status}:{codeRow}
    </div>
  );
};

export default ShelfItem;
