import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShelfItem = ({
  codeRow,
  status,
  shelf,
  onClick,
  disabled,
  isSelectingBin,
}) => {
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

  return (
    <Button
      className={className}
      onClick={() => {
        onClick(shelf.codeBin);
      }}
      disabled={
        disabled.includes(shelf?.codeBin) ||
        (isSelectingBin && status === "Đã đầy")
      }
    >
      {shelf.codeBin}
    </Button>
  );
};

export default ShelfItem;
