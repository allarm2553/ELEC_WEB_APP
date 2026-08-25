/**
 * BJT Transistor Learning Lab
 * Google Apps Script Server Code (Code.gs)
 */

function doGet(e) {
  var page = (e && e.parameter && e.parameter.page) ? e.parameter.page.toLowerCase() : 'bjt';
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('แอปการเรียนรู้ทรานซิสเตอร์ BJT — BJT Transistor Learning Lab')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var result = saveBJTToSheet(data);
    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success:false, message:err.toString()}))
        .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateBJTSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = 'BJT Learning Log';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      'Timestamp (วัน-เวลา)',
      'Student Name (ชื่อผู้เรียน)',
      'Class (ชั้น/กลุ่ม)',
      'Activity (กิจกรรม)',
      'Score (คะแนน)',
      'Note (หมายเหตุ)'
    ]);
    var range = sheet.getRange(1, 1, 1, 6);
    range.setFontWeight('bold');
    range.setBackground('#0f172a');
    range.setFontColor('#f8fafc');
    range.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    for (var i = 1; i <= 6; i++) sheet.autoResizeColumn(i);
  }
  return sheet;
}

function saveBJTToSheet(data) {
  try {
    var sheet = getOrCreateBJTSheet();
    var timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.student || 'นักศึกษา',
      data.class || '',
      data.activity || 'BJT Learning',
      data.result || '',
      data.note || ''
    ]);
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, 6);
    range.setVerticalAlignment('middle');
    sheet.getRange(lastRow, 1, 1, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    return { success: true, message: 'บันทึกข้อมูล BJT ลง Google Sheet สำเร็จ!' };
  } catch (e) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.toString() };
  }
}

function getBJTHistory() {
  try {
    var sheet = getOrCreateBJTSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];
    var startRow = Math.max(2, lastRow - 19);
    var numRows = lastRow - startRow + 1;
    var values = sheet.getRange(startRow, 1, numRows, 6).getValues();
    var history = [];
    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      var formattedDate = '';
      if (row[0] instanceof Date) {
        formattedDate = Utilities.formatDate(row[0], Session.getScriptTimeZone() || 'GMT+7', 'dd/MM/yyyy HH:mm:ss');
      } else {
        formattedDate = row[0].toString();
      }
      history.push({ timestamp: formattedDate, student: row[1], class: row[2], activity: row[3], result: row[4], note: row[5] });
    }
    return history;
  } catch (e) {
    return [];
  }
}