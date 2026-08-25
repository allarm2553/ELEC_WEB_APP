# แอปการเรียนรู้ไดโอดและห้องทดลองเสมือนจริง (Diode Learning Lab & Simulator)

เว็บแอปพลิเคชันสื่อการเรียนการสอนอิเล็กทรอนิกส์เสมือนจริงเรื่อง **ไดโอด (Diode)** แบบอินเทอร์แอคทีฟครบวงจร พัฒนาด้วย HTML5 Canvas, Web Audio API, Modern Glassmorphism Dark UI พร้อมรองรับการรันแบบ Standalone บนเครื่อง หรือนำไปติดตั้งบน **Google Apps Script (GAS)** เพื่อบันทึกผลการทดลองและคะแนนลง **Google Sheets** โดยตรง

---

## ⚡ ฟังก์ชันและโมดูลการเรียนรู้ภายในแอป

### 1. โครงสร้างรอยต่อ PN และฟิสิกส์สารกึ่งตัวนำ (PN Junction & Carrier Physics)
- จำลองการเคลื่อนที่ของ **โฮล (Holes - สาร P)** และ **อิเล็กตรอนอิสระ (Electrons - สาร N)**
- สังเกตการหดตัว/ขยายตัวของ **บริเวณรอยพร่องประจุ (Depletion Region)** แบบไดนามิก
- ปรับสลับวัสดุสารกึ่งตัวนำ: Silicon (~0.7V), Germanium (~0.3V), Schottky (~0.25V), LED แดง/น้ำเงิน (~1.8V - 3.0V)
- ปรับแรงดันไบแอสตรง (Forward Bias), ไบแอสกลับ (Reverse Bias) และไบแอสศูนย์ (Zero Bias)

### 2. กราฟคุณลักษณะกระแส-แรงดัน (I-V Characteristic Curve & Load Line)
- พล็อตเส้นโค้ง I-V Curve ตามสมการ **Shockley Diode Equation**:
  $$I_D = I_S \left(e^{\frac{V_D}{n V_T}} - 1\right)$$
- เลือกรุ่นไดโอดจริง: 1N4007, 1N4148, 1N34A (Germanium), 1N5819 (Schottky), Zener (3.3V, 5.1V, 9.1V, 12V), LEDs
- ปรับอุณหภูมิรอยต่อ (Junction Temperature: -25°C ถึง 125°C) ดูผลการลดลงของ Knee Voltage (-2 mV/°C)
- พล็อตเส้นโหลดไลน์ (DC Load Line) และจุดทำงาน **Q-Point** พร้อมคำนวณกำลังสูญเสีย \(P_D\) และความต้านทานพลวัต \(r_d\)

### 3. ห้องทดลองวงจรไดโอดเสมือนจริง (Virtual Diode Circuit Lab)
- **Half-Wave Rectifier:** วงจรเรียงกระแสครึ่งคลื่น + ตัวเก็บประจุกรองสัญญาณ (Capacitor Filter) ดูค่าแรงดันระลอกคลื่น (Ripple Voltage)
- **Full-Wave Bridge Rectifier:** วงจรบริดจ์เรกติไฟเออร์เต็มคลื่น 4 ไดโอด แสดงรูปคลื่นความถี่ 2 เท่าของความถี่ขาเข้า
- **Zener Voltage Regulator:** วงจรควบคุมแรงดันคงที่ด้วยซีเนอร์ไดโอด ดูการรักษาแรงดันคงที่เมื่อ \(V_{in}\) หรือโหลด \(R_L\) เปลี่ยนแปลง
- **Diode Clipper:** วงจรขลิบสัญญาณยอดคลื่นบวก/ลบ/สองทิศทาง

### 4. เครื่องมือวัดและทดสอบขั้วไดโอด (Diode Testing & Multimeter Lab)
- จำลองการใช้ดิจิตอลมัลติมิเตอร์ย่าน Diode Test
- คลิกสลับสายวัดสีแดง (Probe +) และสายสีดำ (Probe -) เข้าที่ขา Anode / Cathode
- จำลองสถานะไดโอดชำรุด: ไดโอดปกติ (Good), ไดโอดช็อตทะลุ (Shorted - 0V พร้อมเสียง Beep), ไดโอดขาด (Open Circuit - O.L), ไดโอดรั่ว (Leaky)
- ตารางสรุปสเปกไดโอดและรหัสเบอร์ที่พบบ่อย

### 5. แบบทดสอบความรู้และระบบบันทึกผล (Interactive Diode Quiz & Sheets Sync)
- ข้อสอบปรนัยประเมินความรู้พร้อมเฉลยและคำอธิบายโดยละเอียด
- บันทึกผลการทดลองและคะแนนลง Google Sheets ผ่าน `Code.gs` หรือ Export ข้อมูลเป็นไฟล์ CSV

---

## 🚀 วิธีการเปิดใช้งานบนเครื่องคอมพิวเตอร์ (Local Server)

1. ตรวจสอบว่าได้ติดตั้ง **Node.js** เรียบร้อยแล้ว
2. เปิดโปรแกรม Terminal หรือ PowerShell เข้าไปยังโฟลเดอร์ `diode_app`:
   ```bash
   cd d:\ELEC_WEB_APP\diode_app
   ```
3. เริ่มต้นรันเซิร์ฟเวอร์:
   ```bash
   npm start
   # หรือ
   node server.js
   ```
4. เปิดเว็บเบราว์เซอร์ไปที่:
   ```
   http://localhost:3003/
   ```

---

## ☁️ วิธีการติดตั้งบน Google Apps Script (GAS)

1. เปิด Google Drive แล้วสร้าง **Google Sheets** ใหม่ขึ้นมา 1 ไฟล์ (เช่น ตั้งชื่อว่า `Diode Learning Lab Data`)
2. ไปที่เมนู **ส่วนขยาย (Extensions)** -> **Apps Script**
3. คัดลอกโค้ดจากไฟล์ `Code.gs` ไปวางแทนที่ในไฟล์ `Code.gs` บน Apps Script Editor
4. เพิ่มไฟล์ HTML โดยกดปุ่มเครื่องหมาย `+` -> เลือก **HTML** -> ตั้งชื่อไฟล์ว่า `index` (จะได้ `index.html`)
5. คัดลอกโค้ดจากไฟล์ `index.html` ไปวางลงในไฟล์ HTML ที่สร้างขึ้น
6. กดปุ่ม **การทำให้ใช้งานได้ (Deploy)** -> **การทำให้ใช้งานได้ใหม่ (New deployment)**
7. เลือกประเภทเป็น **เว็บแอป (Web app)**
   - คำอธิบาย: `Diode Learning Lab v1.0`
   - ทำงานในฐานะ: **ฉัน (Me)**
   - ผู้ที่มีสิทธิ์เข้าถึง: **ทุกคน (Anyone)**
8. กด **ทำให้ใช้งานได้ (Deploy)** และคัดลอก URL ของ Web App ไปใช้งานได้ทันที
