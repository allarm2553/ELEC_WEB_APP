/**
 * Resistor Color Code Calculator Web App
 * Google Apps Script Server Code (Code.gs)
 * Developed by Antigravity
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('ระบบคำนวณและบันทึกค่าสีตัวต้านทาน')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * ดึงข้อมูลชีตหรือสร้างขึ้นมาใหม่หากยังไม่มี
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Resistor Log";
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // เพิ่มแถวหัวตาราง (Header)
    sheet.appendRow([
      "Timestamp (วัน-เวลาที่คำนวณ)", 
      "Resistor Value (ค่าความต้านทาน)", 
      "Bands (จำนวนแถบสี)", 
      "Colors Sequence (ลำดับสี)", 
      "Tolerance (ความคลาดเคลื่อน)", 
      "Temp Coefficient (สัมประสิทธิ์อุณหภูมิ)",
      "Note (บันทึกเพิ่มเติม)"
    ]);
    
    // จัดแต่งฟอร์แมตของหัวตาราง
    var range = sheet.getRange(1, 1, 1, 7);
    range.setFontWeight("bold");
    range.setBackground("#0f172a"); // Dark slate background
    range.setFontColor("#f8fafc"); // White text
    range.setHorizontalAlignment("center");
    
    sheet.setFrozenRows(1);
    
    // ตั้งค่าความกว้างคอลัมน์อัตโนมัติ
    for (var i = 1; i <= 7; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

/**
 * บันทึกประวัติการคำนวณค่าตัวต้านทานลงใน Google Sheet
 * @param {Object} data ข้อมูลของตัวต้านทาน
 */
function saveResistorToSheet(data) {
  try {
    var sheet = getOrCreateSheet();
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.value || "",
      data.bandsCount || "",
      data.colors || "",
      data.tolerance || "",
      data.tempCoeff || "",
      data.note || ""
    ]);
    
    // จัดตำแหน่งการแสดงผลข้อมูล
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, 7);
    range.setVerticalAlignment("middle");
    sheet.getRange(lastRow, 3).setHorizontalAlignment("center"); // คอลัมน์ Bands จัดกึ่งกลาง
    
    return { success: true, message: "บันทึกข้อมูลลง Google Sheet สำเร็จ!" };
  } catch (e) {
    return { success: false, message: "เกิดข้อผิดพลาดในการบันทึก: " + e.toString() };
  }
}

/**
 * ดึงรายการประวัติ 20 รายการล่าสุดจาก Google Sheet
 */
function getResistorHistory() {
  try {
    var sheet = getOrCreateSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return []; // ไม่มีข้อมูล (นอกจากหัวตาราง)
    }
    
    // ดึงเฉพาะ 20 รายการล่าสุด
    var startRow = Math.max(2, lastRow - 19);
    var numRows = lastRow - startRow + 1;
    var range = sheet.getRange(startRow, 1, numRows, 7);
    var values = range.getValues();
    
    var history = [];
    // วนลูปย้อนกลับจากหลังมาหน้า เพื่อให้ได้รายการล่าสุดขึ้นก่อน
    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      var formattedDate = "";
      if (row[0] instanceof Date) {
        // จัดฟอร์แมตเวลา
        formattedDate = Utilities.formatDate(row[0], Session.getScriptTimeZone() || "GMT+7", "dd/MM/yyyy HH:mm:ss");
      } else {
        formattedDate = row[0].toString();
      }
      
      history.push({
        timestamp: formattedDate,
        value: row[1],
        bandsCount: parseInt(row[2]) || 4,
        colors: row[3],
        tolerance: row[4],
        tempCoeff: row[5],
        note: row[6]
      });
    }
    return history;
  } catch (e) {
    return [];
  }
}
