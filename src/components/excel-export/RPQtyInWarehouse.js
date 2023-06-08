import moment from "moment";
import * as ExcelJS from "exceljs";

export function exportExcel(data, user, warehouseName) {
  const workbook = new ExcelJS.Workbook();
  const fontNormal = { name: "Times New Roman", size: 11 };
  const fontBold = { name: "Times New Roman", size: 11, bold: true };
  const fontTitle = { name: "Times New Roman", size: 14, bold: true };
  const alignmentCenter = { vertical: "middle", horizontal: "center" };
  const alignmentLeft = { vertical: "middle", horizontal: "left" };
  const borderAll = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  const colorHeader = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ffddebf7" },
  };

  let row_index = 9;

  const worksheet = workbook.addWorksheet(warehouseName, {
    views: [{ showGridLines: false }],
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { defaultColWidth: 20, defaultRowHeight: 25 },
  });
  worksheet.addRow(["Hệ thống quản lý kho hàng tiện lợi"]);
  worksheet.addRow([
    "04 Nguyễn Văn Bảo, phường 2, quận Gò Vấp, thành phố Hồ Chí Minh",
  ]);
  worksheet.addRow(["Ngày xuất báo cáo: " + new Date().toLocaleDateString()]);
  worksheet.addRow(["Nhân viên xuất báo cáo: " + user?.fullName]);
  worksheet.addRow(["BÁO CÁO TỔNG SỐ LƯỢNG HÀNG TRONG KHO"]);
  worksheet.addRow(["Ngày: " + new Date().toLocaleDateString()]);
  worksheet.addRow([]);
  worksheet.addRow(["STT", "Tên hàng", "Số lượng"]);

  worksheet.getRow(1).font = fontNormal;
  worksheet.getRow(2).font = fontNormal;
  worksheet.getRow(3).font = fontNormal;
  worksheet.getRow(4).font = fontNormal;

  worksheet.getRow(1).alignment = alignmentLeft;
  worksheet.getRow(2).alignment = alignmentLeft;
  worksheet.getRow(3).alignment = alignmentLeft;
  worksheet.getRow(4).alignment = alignmentLeft;

  worksheet.getRow(5).font = fontTitle;
  worksheet.getRow(5).alignment = alignmentCenter;
  worksheet.getRow(5).height = 35;

  worksheet.getRow(6).font = fontNormal;
  worksheet.getRow(6).alignment = alignmentCenter;
  worksheet.getRow(8).font = fontBold;
  worksheet.getRow(8).height = 30;
  worksheet.getRow(8).alignment = alignmentCenter;
  worksheet.columns = [
    { key: "index", width: 5 },
    { key: "name", width: 35 },
    { key: "quantity", width: 15 },
  ];

  worksheet.getColumn("index").alignment = alignmentLeft;
  worksheet.getColumn("name").alignment = alignmentLeft;
  worksheet.getColumn("quantity").alignment = alignmentCenter;

  data.forEach((item, index) => {
    worksheet.addRow([index + 1, item.name, item.quantity]);
  });

  worksheet.getCell("A8").fill = colorHeader;
  worksheet.getCell("B8").fill = colorHeader;
  worksheet.getCell("C8").fill = colorHeader;

  const fileName = `TKSL_${new Date().toLocaleDateString()}.xlsx`;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const xls64 = workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: fileType });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  });
}
