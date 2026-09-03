# 🚀 ศูนย์รวมการเรียนรู้อิเล็กทรอนิกส์เสมือนจริง (Electronics Web Learning Portal)

สื่อการสอนและห้องปฏิบัติการวิศวกรรมอิเล็กทรอนิกส์เสมือนจริงแบบครบวงจร (Interactive Web-Based Electronics Engineering Labs) ออกแบบภายใต้มาตรฐาน **Dark Glassmorphism UI**, จำลองฟิสิกส์ด้วย **HTML5 Canvas Vector**, คำนวณทางคณิตศาสตร์สดทีละขั้นตอน, แสดงผังขาอุปกรณ์จริง, ออสซิลโลสโคป 2 แชนแนล, และระบบบันทึกผลคะแนนผ่าน **Google Sheets**

---

## 🌟 จุดเริ่มต้นการใช้งาน (Getting Started)

### 1. การเปิดใช้งานผ่าน Master Unified Server (แนะนำ)

สามารถสตาร์ทเซิร์ฟเวอร์หลักที่ Root Directory เพียงคำสั่งเดียวเพื่อเข้าถึงทุกแอปพลิเคชัน:

```bash
# 1. เข้าสู่โฟลเดอร์หลัก
cd d:\ELEC_WEB_APP

# 2. เริ่มต้น Master Server
node server.js
# หรือ
npm start
```

🌐 **เปิดเบราว์เซอร์เข้าสู่ Master Dashboard:** [http://localhost:8080/](http://localhost:8080/)

---

## 📚 รายชื่อ 10 ห้องปฏิบัติการและการเข้าถึง (10 Virtual Labs)

| ลำดับ | ห้องปฏิบัติการ (Learning Lab) | โฟลเดอร์ | Sub-path (Server 8080) | พอร์ตเฉพาะ (Standalone) | เนื้อหาและจุดเด่นหลัก |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **1** | **Resistor & DC Circuits** | `resistor-sheet-app` | [`/resistor/`](http://localhost:8080/resistor/) | `3001` | รหัสสีตัวต้านทาน 4-5 แถบสี, การต่ออนุกรม/ขนาน/ผสม, กฎของโอห์ม |
| **2** | **Multimeter Virtual Lab** | `multimeter_app` | [`/multimeter/`](http://localhost:8080/multimeter/) | `3002` | มัลติมิเตอร์แบบเข็ม (VOM) และดิจิตอล (DMM), วัด DCV/ACV/DCA/Ω |
| **3** | **Oscilloscope Simulator** | `osc_apps` | [`/oscilloscope/`](http://localhost:8080/oscilloscope/) | `3000` | สโคป 2 แชนแนล, Time/div, Volts/div, Trigger, กราฟ Lissajous |
| **4** | **Diode Basics & Rectifiers** | `diode_app` | [`/diode/`](http://localhost:8080/diode/) | `3003` | ฟิสิกส์ PN Junction, ตัวถังจริง, วงจร Half/Full/Bridge Rectifiers, ซีเนอร์ |
| **5** | **BJT Transistor & DC Bias** | `bjt_app` | [`/bjt/`](http://localhost:8080/bjt/) | `3004` | โครงสร้าง NPN/PNP, DC Load Line, การไบอัส 4 แบบ, BJT Tester ขาจริง |
| **6** | **FET & MOSFET Transistor Lab** | `fet_apps` | [`/fet/`](http://localhost:8080/fet/) | `3007` | N/P-JFET, N-D-MOSFET (N-Channel ถาวร), N-E-MOSFET, ช็อกเลย์, ไบอัส |
| **7** | **BJT Small-Signal AC Models** | `bjt_small_signal_app` | [`/bjt-ac/`](http://localhost:8080/bjt-ac/) | `3006` | แบบจำลอง $r_e$ และ Hybrid $h$-Parameter, เปรียบเทียบ CE (180°), CC, CB |
| **8** | **FET Small-Signal AC Models** | `fet_small_signal` | [`/fet-ac/`](http://localhost:8080/fet-ac/) | `3005` | แบบจำลอง $g_m v_{gs}$, วงจรขยาย CS, CD, CG, กราฟถ่ายโอน JFET & E-MOSFET |
| **9** | **Diode Applications** | `diode_application` | [`/diode-app/`](http://localhost:8080/diode-app/) | `3008` | วงจรตัดรูปคลื่น (Clippers), ยกระดับสัญญาณ (Clampers), ทวีแรงดัน (2x, 3x, 4x) |
| **10** | **Op-Amp Interactive Lab** | `opamp` | [`/opamp/`](http://localhost:8080/opamp/) | `3009` | โครงสร้าง Op-Amp, ผังขาจริง (741, LM358, TL082, NE5532, OP07, LM324), 6 วงจรขยาย, Comparator, Schmitt, Scope |

---

## 📊 ระบบบันทึกคะแนน Google Sheets (Google Apps Script)

ทุกแอปพลิเคชันมีระบบแบบทดสอบท้ายบทเรียนพร้อมเฉลยละเอียด และไฟล์ `Code.gs` สำหรับนำไปติดตั้งบน Google Apps Script เพื่อบันทึกคะแนนของผู้เรียนเข้าสู่ Google Spreadsheet แบบเรียลไทม์

---

## 🛠️ Stack & Technologies

- **Frontend:** Vanilla JavaScript (ES6+), HTML5 Canvas 2D Vector Simulator, Web Audio API
- **Styling:** Modern CSS3, Dark Glassmorphism, Google Fonts (Chakra Petch, Sarabun, JetBrains Mono)
- **Backend Server:** Node.js Native HTTP Server (No external npm dependencies required)
- **Database / Logging:** Google Apps Script + Google Sheets API & UTF-8 BOM CSV Export
