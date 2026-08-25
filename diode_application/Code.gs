/**
 * Diode Applications Learning Lab (Clippers, Clampers, Multipliers)
 * Google Apps Script Server Code (Code.gs)
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('แอปการเรียนรู้วงจรประยุกต์ไดโอด — Diode Applications Lab')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var result = saveDiodeAppToSheet(data);
    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success:false, message:err.toString()}))
        .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateDiodeAppSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = 'Diode Applications Log';
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

function saveDiodeAppToSheet(data) {
  try {
    var sheet = getOrCreateDiodeAppSheet();
    var timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.student || 'นักศึกษา',
      data.class || '',
      data.activity || 'Diode Applications Learning',
      data.result || '',
      data.note || ''
    ]);
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange(lastRow, 1, 1, 6);
    range.setVerticalAlignment('middle');
    sheet.getRange(lastRow, 1, 1, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    return { success: true, message: 'บันทึกข้อมูลวงจรประยุกต์ไดโอดลง Google Sheet สำเร็จ!' };
  } catch (e) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.toString() };
  }
}