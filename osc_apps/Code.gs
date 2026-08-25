/**
 * Oscilloscope Simulator & Analyzer Web App
 * Google Apps Script Server Code (Code.gs)
 * Developed by Antigravity
 */

function doGet(e) {
  // รองรับการนำทางแบบหลายหน้า (Routing) ด้วย query parameter: ?page=resistor หรือ ?page=oscilloscope
  var page = (e && e.parameter && e.parameter.page) ? e.parameter.page.toLowerCase() : 'oscilloscope';
  
  if (page === 'resistor') {
    return HtmlService.createHtmlOutputFromFile('index')
        .setTitle('ระบบคำนวณและบันทึกค่าสีตัวต้านทาน')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // หน้าตั้งต้น (Default page) เป็นหน้าจอ Oscilloscope
  return HtmlService.createHtmlOutputFromFile('oscilloscope')
      .setTitle('เครื่องจำลองและวิเคราะห์ออสซิลโลสโคป')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * ดึงข้อมูลชีตหรือสร้างตารางประวัติ Oscilloscope ใหม่
 */
function getOrCreateOscilloscopeSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Oscilloscope Log";
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // เพิ่มแถวหัวตาราง (Header)
    sheet.appendRow([
      "Timestamp (วัน-เวลาที่วัดค่า)", 
      "Timebase (เวลาต่อช่อง)", 
      "CH1 Scale (แรงดันช่อง 1)", 
      "CH1 Vpp (แรงดันยอดถึงยอด)", 
      "CH1 Frequency (ความถี่สัญญาณ)", 
      "CH2 Scale (แรงดันช่อง 2)", 
      "CH2 Vpp (แรงดันยอดถึงยอด)", 
      "CH2 Frequency (ความถี่สัญญาณ)", 
      "Note (บันทึกเพิ่มเติม)"
    ]);
    
    // จัดแต่งฟอร์แมตหัวตาราง
    var range = sheet.getRange(1, 1, 1, 9);
    range.setFontWeight("bold");
    range.setBackground("#0f172a"); // Dark slate background
    range.setFontColor("#f8fafc"); // White text
    range.setHorizontalAlignment("center");
    
    sheet.setFrozenRows(1);
    
    // ตั้งค่าความกว้างคอลัมน์อัตโนมัติ
    for (var i = 1; i <= 9; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

/**
 * บันทึกประวัติการวัดค่าจากหน้าจอ Oscilloscope ลงใน Google Sheet
 * @param {Object} data ข้อมูลพารามิเตอร์การวัด
 */
function saveOscilloscopeToSheet(data) {
  try {
    var sheet = getOrCreateOscilloscopeSheet();
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.timebase || "",
      data.ch1Scale || "",
      data.ch1Vpp || "",
      data.ch1Freq || "",
      data.ch2Scale || "",
      data.ch2Vpp || "",
      data.ch2Freq || "",
      data.note || ""
    ]);
    
    // จัดรูปแบบแนวตั้งและแนวนอนของข้อมูลใหม่ในชีต
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, 9);
    range.setVerticalAlignment("middle");
    sheet.getRange(lastRow, 2, 1, 7).setHorizontalAlignment("center"); // จัดค่าสเกลต่าง ๆ กึ่งกลางคอลัมน์
    
    return { success: true, message: "บันทึกค่าการวัดลง Google Sheet สำเร็จ!" };
  } catch (e) {
    return { success: false, message: "เกิดข้อผิดพลาดในการบันทึก: " + e.toString() };
  }
}

/**
 * ดึงรายการประวัติ 20 รายการล่าสุดของการวัดค่า Oscilloscope จาก Google Sheet
 */
function getOscilloscopeHistory() {
  try {
    var sheet = getOrCreateOscilloscopeSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return []; // ไม่มีข้อมูล
    }
    
    // ดึงเฉพาะ 20 รายการล่าสุด
    var startRow = Math.max(2, lastRow - 19);
    var numRows = lastRow - startRow + 1;
    var range = sheet.getRange(startRow, 1, numRows, 9);
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
        timebase: row[1],
        ch1Scale: row[2],
        ch1Vpp: row[3],
        ch1Freq: row[4],
        ch2Scale: row[5],
        ch2Vpp: row[6],
        ch2Freq: row[7],
        note: row[8]
      });
    }
    return history;
  } catch (e) {
    return [];
  }
}
