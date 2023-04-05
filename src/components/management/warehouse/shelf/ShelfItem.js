import React, { useState, useEffect } from "react";

const ShelfItem = ({ codeRow, status, shelf, onClick }) => {
  const isFull = status === "Đã đầy";
  const className = isFull
    ? "shelf__item shelf__item--full"
    : "shelf__item shelf__item--available";

  return (
    <div className={className} onClick={() => onClick(shelf.codeRow)}>
      {status}:{codeRow}
    </div>
  );
};

export default ShelfItem;
