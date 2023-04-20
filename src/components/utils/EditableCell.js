import { Input } from "antd";
import { useState, useRef, useEffect } from "react";

const EditableCell = ({
  editable,
  dataIndex,
  title,
  record,
  handleQuantityChange,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      toggleEdit();
    }
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleChange = (event) => {
    const { value } = event.target;
    handleQuantityChange(value);
  };

  let childNode = <div>{record[dataIndex]}</div>;
  if (editable) {
    childNode = editing ? (
      <Input
        ref={inputRef}
        onPressEnter={toggleEdit}
        onBlur={toggleEdit}
        onChange={handleChange}
      />
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {record[dataIndex] || " "}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
