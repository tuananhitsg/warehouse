import moment from "moment";
import * as ExcelJS from "exceljs";

export function exportExcel(data, user,  fromDate, toDate) {
  const workbook = new ExcelJS.Workbook();
  const fontNormal = { name: "Times New Roman", size: 11 };
  const fontBold = { name: "Times New Roman", size: 11, bold: true };
  const fontTitle = { name: "Times New Roman", size: 14, bold: true };
  const alignmentCenter = { vertical: "middle", horizontal: "center" };
  const alignmentLeft = { vertical: "middle", horizontal: "left" };

  const parts1 = fromDate.split("-");
  const parts2 = toDate.split("-");
  const formattedFromDate = `${parts1[2]}/${parts1[1]}/${parts1[0]}`;
  const formattedToDate = `${parts2[2]}/${parts2[1]}/${parts2[0]}`;

  const date = moment().format('DD/MM/YYYY');
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

  const worksheet = workbook.addWorksheet("SLHN", {
    views: [{ showGridLines: false }],
    pageSetup: { paperSize: 9, orientation: "landscape" },
    properties: { defaultColWidth: 20, defaultRowHeight: 25 },
  });
  worksheet.addRow(["Hệ thống quản lý kho hàng tiện lợi"]);
  worksheet.addRow([
    "04 Nguyễn Văn Bảo, phường 2, quận Gò Vấp, thành phố Hồ Chí Minh",
  ]);
  worksheet.addRow(["Ngày xuất báo cáo: " + date]);
  worksheet.addRow(["Nhân viên xuất báo cáo: " + user?.fullName]);
  worksheet.addRow(["BÁO CÁO TỔNG SỐ LƯỢNG HÀNG NHẬP THEO THỜI GIAN"]);
  worksheet.addRow(["Từ ngày: " + formattedFromDate + " đến ngày: " + formattedToDate]);
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

  const fileName = `TKSLN_${date}.xlsx`;
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
