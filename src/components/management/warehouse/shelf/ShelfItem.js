import React, { useState, useEffect } from "react";

const ShelfItem = ({codeRow ,status, shelf, onClick }) => {
  const isFull = status === "full";
  const className = isFull
    ? "shelf__item shelf__item--full"
    : "shelf__item shelf__item--available";

  return (
    <div className={className} onClick={() => onClick(shelf.codeRow)}>
      {status}
    </div>

  );
};

export default ShelfItem;
