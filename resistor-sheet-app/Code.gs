/**
 * Resistor & DC Circuit Learning Lab Web App
 * Google Apps Script Server Code (Code.gs)
 * Developed by Antigravity
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('แอปการเรียนรู้ตัวต้านทานและวงจรไฟฟ้า — Resistor & DC Circuit Learning Lab')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var result = saveResistorToSheet(data);
    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success:false, message:err.toString()}))
        .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ดึงข้อมูลชีตหรือสร้างขึ้นมาใหม่หากยังไม่มี
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Resistor Learning Log";
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // เพิ่มแถวหัวตาราง (Header)
    sheet.appendRow([
      "Timestamp (วัน-เวลา)", 
      "Student Name (ชื่อ-นามสกุล)", 
      "Class / Dept (ชั้น/แผนก)", 
      "Activity (กิจกรรม/การทดลอง)", 
      "Result / Value (ผลลัพธ์/ค่า)", 
      "Note (บันทึกเพิ่มเติม)"
    ]);
    
    // จัดแต่งฟอร์แมตของหัวตาราง
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
 * บันทึกประวัติการคำนวณและการทดลองลงใน Google Sheet
 * @param {Object} data ข้อมูลของตัวต้านทานและการทดลอง
 */
function saveResistorToSheet(data) {
  try {
    var sheet = getOrCreateSheet();
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.student || "นักศึกษา",
      data.class || "",
      data.activity || "การทดลองตัวต้านทาน",
      data.result || data.value || "",
      data.note || ""
    ]);
    
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, 6);
    range.setVerticalAlignment("middle");
    
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
      return [];
    }
    
    var startRow = Math.max(2, lastRow - 19);
    var numRows = lastRow - startRow + 1;
    var range = sheet.getRange(startRow, 1, numRows, 6);
    var values = range.getValues();
    
    var history = [];
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
        class: row[2],
        activity: row[3],
        result: row[4],
        note: row[5]
      });
    }
    return history;
  } catch (e) {
    return [];
  }
}
