/**
 * Diode Learning Lab & Interactive Simulator Web App
 * Google Apps Script Server Code (Code.gs)
 * Developed for Electronics Interactive Learning
 */

function doGet(e) {
  // รองรับการนำทางแบบหลายหน้า (Routing) ด้วย query parameter: ?page=diode, ?page=resistor, ?page=oscilloscope, ?page=multimeter
  var page = (e && e.parameter && e.parameter.page) ? e.parameter.page.toLowerCase() : 'diode';
  
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

  if (page === 'multimeter') {
    return HtmlService.createHtmlOutputFromFile('multimeter')
        .setTitle('เครื่องจำลองมัลติมิเตอร์แบบอนาล็อก')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  
  // หน้าตั้งต้น (Default page) เป็นหน้าจอห้องเรียนรู้ไดโอด (Diode Learning Lab)
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('แอปการเรียนรู้ไดโอดและห้องทดลองเสมือนจริง (Diode Learning Lab)')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * ดึงข้อมูลชีตหรือสร้างตารางประวัติการเก็บข้อมูลของไดโอดใหม่
 */
function getOrCreateDiodeSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Diode Learning Log";
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // เพิ่มแถวหัวตาราง (Header)
    sheet.appendRow([
      "Timestamp (วัน-เวลาที่บันทึก)", 
      "Student Name (ชื่อผู้เรียน)", 
      "Activity / Module (กิจกรรม/โมดูล)", 
      "Result / Score (ผลลัพธ์/คะแนน)", 
      "Lab Note (หมายเหตุเพิ่มเติม)"
    ]);
    
    // จัดแต่งฟอร์แมตหัวตาราง
    var range = sheet.getRange(1, 1, 1, 5);
    range.setFontWeight("bold");
    range.setBackground("#0f172a"); // Dark slate background
    range.setFontColor("#f8fafc"); // White text
    range.setHorizontalAlignment("center");
    
    sheet.setFrozenRows(1);
    
    // ตั้งค่าความกว้างคอลัมน์อัตโนมัติ
    for (var i = 1; i <= 5; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

/**
 * บันทึกผลการทดลองหรือคะแนนแบบทดสอบไดโอดลงใน Google Sheet
 * @param {Object} data ข้อมูลการวัด
 */
function saveDiodeToSheet(data) {
  try {
    var sheet = getOrCreateDiodeSheet();
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.student || "นักศึกษา",
      data.activity || "การทดลองไดโอด",
      data.result || "",
      data.note || ""
    ]);
    
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, 5);
    range.setVerticalAlignment("middle");
    sheet.getRange(lastRow, 1, 1, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 4, 1, 1).setHorizontalAlignment("center");
    
    return { success: true, message: "บันทึกข้อมูลไดโอดลง Google Sheet สำเร็จ!" };
  } catch (e) {
    return { success: false, message: "เกิดข้อผิดพลาดในการบันทึก: " + e.toString() };
  }
}

/**
 * ดึงรายการประวัติการทดลองและคะแนน 20 รายการล่าสุดจาก Google Sheet
 */
function getDiodeHistory() {
  try {
    var sheet = getOrCreateDiodeSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return []; // ไม่มีข้อมูล
    }
    
    // ดึงเฉพาะ 20 รายการล่าสุด
    var startRow = Math.max(2, lastRow - 19);
    var numRows = lastRow - startRow + 1;
    var range = sheet.getRange(startRow, 1, numRows, 5);
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
        student: row[1],
        activity: row[2],
        result: row[3],
        note: row[4]
      });
    }
    return history;
  } catch (e) {
    return [];
  }
}
