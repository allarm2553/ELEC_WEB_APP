# แอปการเรียนรู้: วงจรประยุกต์ไดโอด (Diode Applications Learning Lab)

แอปพลิเคชันเว็บเพื่อการเรียนรู้และจำลองการทำงานของ **วงจรตัดรูปคลื่น (Diode Clippers)**, **วงจรยกระดับสัญญาณ (Diode Clampers)**, และ **วงจรทวีแรงดัน (Voltage Multipliers)**

## การเริ่มต้นใช้งาน (Getting Started)

```bash
# 1. เข้าไปยังโฟลเดอร์แอป
cd d:\ELEC_WEB_APP\diode_application

# 2. เริ่มต้นเซิร์ฟเวอร์
node server.js
# หรือ
npm start

# 3. เปิดเบราว์เซอร์
# http://localhost:3008/
```

## 5 โมดูลการเรียนรู้หลัก

1. **โมดูล 1: วงจรตัดรูปคลื่น (Diode Clippers / Limiters):** Series Clipper, Shunt Clipper, Biased Clipper, Dual-level Slicer พร้อมกราฟ Transfer Characteristic
2. **โมดูล 2: วงจรยกระดับสัญญาณ (Diode Clampers / DC Restorers):** Positive Clamper, Negative Clamper, Biased Clamper พร้อมแอนิเมชันประจุคาปาซิเตอร์
3. **โมดูล 3: วงจรทวีแรงดัน (Voltage Multipliers):** Half-Wave & Full-Wave Voltage Doubler ($2V_m$), Tripler ($3V_m$), Quadrupler ($4V_m$) แบบ Cockcroft-Walton
4. **โมดูล 4: ห้องทดลองเสมือนจริง & Dual-Trace Scope (Virtual Lab):** สลับวงจร ปรับ $V_{in}, V_{bias}, R, C$ และดูรูปคลื่นเปรียบเทียบสดๆ
5. **โมดูล 5: แบบทดสอบความรู้ & Google Sheets:** ควิซปรนัย 12 ข้อภาษาไทยพร้อมเฉลยละเอียด, Export CSV (UTF-8 BOM), บันทึกผลลง Google Sheets

## Port

แอปนี้รันบน Port **3008**