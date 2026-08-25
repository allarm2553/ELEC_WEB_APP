/**
 * Analog Multimeter Simulator & Analyzer Web App
 * Google Apps Script Server Code (Code.gs)
 * Developed by Antigravity
 */

function doGet(e) {
  // รองรับการนำทางแบบหลายหน้า (Routing) ด้วย query parameter: ?page=resistor, ?page=oscilloscope, ?page=multimeter
  var page = (e && e.parameter && e.parameter.page) ? e.parameter.page.toLowerCase() : 'multimeter';
  
  if (page === 'resistor') {
    return HtmlService.createHtmlOutputFromFile('index')
        .setTitle('ระบบคำนวณและบันทึกค่าสีตัวต้านทาน')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  if (page === 'oscilloscope') {
    return HtmlService.createHtmlOutputFromFile('oscilloscope')
        .setTitle('เครื่องจำลองและวิเคราะห์ออสซิลโลสโคป')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // หน้าตั้งต้น (Default page) เป็นหน้าจอมัลติมิเตอร์แบบเข็ม (Analog Multimeter)
  return HtmlService.createHtmlOutputFromFile('multimeter')
      .setTitle('เครื่องจำลองมัลติมิเตอร์แบบอนาล็อก')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * ดึงข้อมูลชีตหรือสร้างตารางประวัติการเก็บข้อมูลของมัลติมิเตอร์ใหม่
 */
function getOrCreateMultimeterSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Multimeter Log";
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // เพิ่มแถวหัวตาราง (Header)
    sheet.appendRow([
      "Timestamp (วัน-เวลาที่บันทึก)", 
      "Range Selection (ย่านวัดที่เลือก)", 
      "Measured Value (ค่าที่วัดได้)", 
      "Measured Component (ชิ้นส่วนที่วัด)", 
      "Needle Deflection % (เข็มเบน %)", 
      "Note (บันทึกเพิ่มเติม)"
    ]);
    
    // จัดแต่งฟอร์แมตหัวตาราง
    var range = sheet.getRange(1, 1, 1, 6);
    range.setFontWeight("bold");
    range.setBackground("#0f172a"); // Dark slate background
    range.setFontColor("#f8fafc"); // White text
    range.setHorizontalAlignment("center");
    
    sheet.setFrozenRows(1);
    
    // ตั้งค่าความกว้างคอลัมน์อัตโนมัติ
    for (var i = 1; i <= 6; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

/**
 * บันทึกค่าการวัดจากเครื่องมัลติมิเตอร์ลงใน Google Sheet
 * @param {Object} data ข้อมูลการวัด
 */
function saveMultimeterToSheet(data) {
  try {
    var sheet = getOrCreateMultimeterSheet();
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.range || "",
      data.value || "",
      data.component || "",
      data.deflection || "",
      data.note || ""
    ]);
    
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, 6);
    range.setVerticalAlignment("middle");
    sheet.getRange(lastRow, 2, 1, 4).setHorizontalAlignment("center"); // จัดค่าสเกลและข้อมูลหลักไว้กลางช่อง
    
    return { success: true, message: "บันทึกค่ามัลติมิเตอร์ลง Google Sheet สำเร็จ!" };
  } catch (e) {
    return { success: false, message: "เกิดข้อผิดพลาดในการบันทึก: " + e.toString() };
  }
}

/**
 * ดึงรายการประวัติการวัด 20 รายการล่าสุดของมัลติมิเตอร์จาก Google Sheet
 */
function getMultimeterHistory() {
  try {
    var sheet = getOrCreateMultimeterSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return []; // ไม่มีข้อมูล
    }
    
    // ดึงเฉพาะ 20 รายการล่าสุด
    var startRow = Math.max(2, lastRow - 19);
    var numRows = lastRow - startRow + 1;
    var range = sheet.getRange(startRow, 1, numRows, 6);
    var values = range.getValues();
    
    var history = [];
    // วนลูปย้อนกลับเพื่อให้ล่าสุดขึ้นก่อน
    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      var formattedDate = "";
      if (row[0] instanceof Date) {
        formattedDate = Utilities.formatDate(row[0], Session.getScriptTimeZone() || "GMT+7", "dd/MM/yyyy HH:mm:ss");
      } else {
        formattedDate = row[0].toString();
      }
      
      history.push({
        timestamp: formattedDate,
        range: row[1],
        value: row[2],
        component: row[3],
        deflection: row[4],
        note: row[5]
      });
    }
    return history;
  } catch (e) {
    return [];
  }
}
