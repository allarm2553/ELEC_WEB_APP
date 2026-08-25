# แอปการเรียนรู้: FET & MOSFET (FET & MOSFET Fundamentals Lab)

แอปพลิเคชันเว็บเพื่อการเรียนรู้และจำลองการทำงานของ **FET และ MOSFET (Field Effect Transistors)** ครอบคลุม **JFET, D-MOSFET, E-MOSFET**, โครงสร้างทางกายภาพ, ฟิสิกส์การนำกระแส, กราฟลักษณะเฉพาะ และวงจรไบอัส

## การเริ่มต้นใช้งาน (Getting Started)

```bash
# 1. เข้าไปยังโฟลเดอร์แอป
cd d:\ELEC_WEB_APP\fet_apps

# 2. เริ่มต้นเซิร์ฟเวอร์
node server.js
# หรือ
npm start

# 3. เปิดเบราว์เซอร์
# http://localhost:3007/
```

## 5 โมดูลการเรียนรู้หลัก

1. **โมดูล 1: ชนิดและโครงสร้าง FET/MOSFET (Types & Physics):** JFET, D-MOSFET, E-MOSFET (N-Channel & P-Channel), แอนิเมชันการเคลื่อนที่ของอิเล็กตรอน (Carrier Animation), การขยายตัวของ Depletion Region / Inversion Layer
2. **โมดูล 2: กราฟลักษณะเฉพาะ (FET Characteristics):** สมการ Shockley, กราฟ Drain Curves (Family of Curves), DC Load Line, Q-Point, บริเวณทำงาน Ohmic, Saturation, Cutoff, Breakdown
3. **โมดูล 3: วงจรไบอัส & ห้องทดลองเสมือนจริง (Biasing & Virtual Lab):** Fixed-Bias, Self-Bias, Voltage-Divider Bias, MOSFET Switch Driver ขับโหลด LED/Motor, Dual-Trace Scope Auto-Scale
4. **โมดูล 4: เครื่องมือวัดและทดสอบ FET (FET Tester & Datasheets):** มัลติมิเตอร์เสมือน DMM ทดสอบ Gate insulation, $R_{DS(on)}$, การจำลอง Fault, ตาราง Datasheet เบอร์ยอดนิยม
5. **โมดูล 5: แบบทดสอบความรู้ & Google Sheets:** ควิซปรนัย 12 ข้อภาษาไทยพร้อมเฉลยละเอียด, Export CSV (UTF-8 BOM), บันทึกผลลง Google Sheets

## Port

แอปนี้รันบน Port **3007**