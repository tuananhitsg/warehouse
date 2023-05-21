import XLSX from "xlsx";

const tableToExcel = (table, name) => {
    const data = table.props.dataSource;
    const header = table.props.columns.map((col) => col.title);
    const ws = XLSX.utils.json_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${name}.xlsx`);
  };
  