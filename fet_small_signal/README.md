# แอปการเรียนรู้: การวิเคราะห์สัญญาณขนาดเล็กของ FET (FET Small-Signal Analysis Lab)

แอปพลิเคชันเว็บเพื่อการเรียนรู้และจำลองการวิเคราะห์สัญญาณขนาดเล็กสำหรับ **FET (JFET / MOSFET)**

## การเริ่มต้นใช้งาน (Getting Started)

```bash
cd d:\ELEC_WEB_APP\fet_small_signal
node server.js
# เปิดเบราว์เซอร์: http://localhost:3005/
```

## โมดูลหลัก 5 โมดูล

1. **โมเดลสัญญาณขนาดเล็ก & Transconductance (g_m):** กราฟ Transfer Curve, การหาค่าความชัน g_m, วงจรสมมูล AC Model
2. **วงจรขยาย FET 3 โครงแบบหลัก:** Common Source (CS), Source Follower / Common Drain (CD), Common Gate (CG)
3. **ห้องทดลองเสมือนจริง & Dual-Trace Scope:** จำลองคลื่น CH1 Input vs CH2 Output, ปรับสเกล Volt/div, Auto-scale, Clipping
4. **เปรียบเทียบ BJT vs FET:** วิเคราะห์จุดเด่น Zin, gm, โครงสร้าง, ตาราง Datasheet พิกัดเบอร์ยอดนิยม
5. **แบบทดสอบความรู้ 12 ข้อ & Google Sheets:** ควิซเก็บคะแนน, Export CSV, บันทึกคะแนนลง Google Sheets

## Port

แอปนี้รันบน Port **3005**