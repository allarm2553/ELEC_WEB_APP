---
name: elec_learning_app
description: Comprehensive guidelines, design systems, physical semiconductor models, mathematical simulation engines, schematic vector standards, and deployment rules for building interactive Electronics Web Learning Labs (Resistor, Multimeter, Oscilloscope, Diode, BJT, JFET, MOSFET, BJT AC, FET AC, Diode Applications, Op-Amp) with Dark Glassmorphism, HTML5 Canvas physics, Master Unified Portal, and Google Sheets integration.
---

# คู่มือและมาตรฐานการพัฒนาสื่อการสอนและห้องปฏิบัติการอิเล็กทรอนิกส์เสมือนจริง (Electronics Web Learning Lab Standard)

เอกสารมาตรฐานสถาปัตยกรรมและการพัฒนาแอปพลิเคชันเว็บเพื่อการเรียนรู้วิชาอิเล็กทรอนิกส์ (Electronics Web Learning Lab) ในรูปแบบ Interactive Single-Page Application (SPA) พร้อมหน้า **Master Dashboard Portal** รวมศูนย์, ห้องทดลองเสมือนจริง, การคำนวณสดทีละขั้นตอน (Live Step-by-Step Math Solvers), ฟิสิกส์สารกึ่งตัวนำบน HTML5 Canvas, ออสซิลโลสโคป 2 แชนแนล, และระบบบันทึกผลการเรียนรู้ผ่าน Google Sheets

---

## 1. สถาปัตยกรรมระบบรวมศูนย์ (Master Portal & App Directory Structure)

ระบบประกอบด้วยหน้า **Master Dashboard Portal (`index.html`)** ที่ Root Directory ควบคู่กับ **Master Unified HTTP Server (`server.js`)** บนพอร์ต **8080** ซึ่งทำหน้าที่เป็น Single Entry Point และรองรับการเผยแพร่บน **GitHub Pages** ได้ 100%:

```
d:\ELEC_WEB_APP\
├── index.html                  # 🌐 Main Dashboard Portal (รวมศูนย์ 10 Labs, ค้นหา, กรองหมวดหมู่, Modal Workspace)
├── server.js                   # 🚀 Master Unified HTTP Server (Port 8080) จัดการ Sub-paths ทั้งหมด
├── package.json                # Master NPM Metadata ("start": "node server.js")
├── README.md                   # เอกสารแนะนำภาพรวมทั้ง 10 Labs และผังการเรียนรู้
│
├── resistor-sheet-app/         # 🔴 1. Resistor Color Code & DC Circuits (Port 3001 | /resistor/)
├── multimeter_app/             # 🎛️ 2. Multimeter Simulator Lab (Port 3002 | /multimeter/)
├── osc_apps/                   # 📊 3. Oscilloscope Simulator (Port 3000 | /oscilloscope/)
├── diode_app/                  # ⚡ 4. Diode Basics & Rectifiers (Port 3003 | /diode/)
├── bjt_app/                    # 🔌 5. BJT Transistor & DC Bias (Port 3004 | /bjt/)
├── fet_apps/                   # 🔬 6. FET & MOSFET Learning Lab (Port 3007 | /fet/)
├── bjt_small_signal_app/       # 📻 7. BJT Small-Signal AC Models (Port 3006 | /bjt-ac/)
├── fet_small_signal/           # 🌊 8. FET Small-Signal AC Models (Port 3005 | /fet-ac/)
├── diode_application/          # ✂️ 9. Diode Applications (Port 3008 | /diode-app/)
└── opamp/                      # 🎛️ 10. Op-Amp Interactive Lab (Port 3009 | /opamp/)
```

---

## 2. พอร์ตและเส้นทางเข้าถึงแอปพลิเคชัน (Port & Route Standards)

| ลำดับ | แอปพลิเคชัน | โฟลเดอร์ | Master Route (Port 8080) | Standalone Port | หมวดหมู่ |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **—** | **Master Dashboard** | `.` | [`http://localhost:8080/`](http://localhost:8080/) | `8080` | ศูนย์รวมทุกบทเรียน |
| **1** | **Resistor & DC Circuits** | `resistor-sheet-app` | [`/resistor/`](http://localhost:8080/resistor/) | `3001` | เครื่องมือ & RLC |
| **2** | **Multimeter Simulator** | `multimeter_app` | [`/multimeter/`](http://localhost:8080/multimeter/) | `3002` | เครื่องมือ & RLC |
| **3** | **Oscilloscope Simulator** | `osc_apps` | [`/oscilloscope/`](http://localhost:8080/oscilloscope/) | `3000` | เครื่องมือ & RLC |
| **4** | **Diode Basics & Rectifier** | `diode_app` | [`/diode/`](http://localhost:8080/diode/) | `3003` | สารกึ่งตัวนำ |
| **5** | **BJT Transistor & DC Bias** | `bjt_app` | [`/bjt/`](http://localhost:8080/bjt/) | `3004` | สารกึ่งตัวนำ |
| **6** | **FET & MOSFET Transistors** | `fet_apps` | [`/fet/`](http://localhost:8080/fet/) | `3007` | สารกึ่งตัวนำ |
| **7** | **BJT Small-Signal AC** | `bjt_small_signal_app` | [`/bjt-ac/`](http://localhost:8080/bjt-ac/) | `3006` | วงจรขยายสัญญาณ |
| **8** | **FET Small-Signal AC** | `fet_small_signal` | [`/fet-ac/`](http://localhost:8080/fet-ac/) | `3005` | วงจรขยายสัญญาณ |
| **9** | **Diode Applications** | `diode_application` | [`/diode-app/`](http://localhost:8080/diode-app/) | `3008` | แปรรูปคลื่น & ไอซี |
| **10** | **Op-Amp Interactive Lab** | `opamp` | [`/opamp/`](http://localhost:8080/opamp/) | `3009` | แปรรูปคลื่น & ไอซี |

---

## 3. กฎเหล็กทางเทคนิคและสถาปัตยกรรม (Core Architectural Rules)

### 1. ความเข้ากันได้กับ GitHub Pages (GitHub Pages Relative Links Rule):
- **ห้ามใช้ Absolute Paths ที่ขึ้นต้นด้วย `/` เดี่ยวๆ ในหน้า Master Dashboard** (เช่น `/resistor/` จะตัดชื่อ Repository ออกจนเกิดข้อผิดพลาด 404 บน `https://<user>.github.io/<repo>/`)
- **ต้องใช้ Relative Directory Path เสมอ:** เช่น `resistor-sheet-app/`, `diode_app/`, `bjt_app/` เพื่อให้ทำงานได้ทั้งบน GitHub Pages, Local Node.js Server, และ Direct File Protocol (`file:///...`)
- ทุกโฟลเดอร์แอปต้องมีไฟล์ `index.html` อยู่เสมอ

### 2. ไวยากรณ์ Regular Expression ใน JavaScript:
- ใน JS RegExp Literals **ห้ามใส่ Backslash ซ้อนกัน** เช่น `/^\d{3}$/` ผิด ให้ใช้ `/^\d{3}$/` เท่านั้น (เนื่องจาก `\` จะทำให้มองหาอักษรแบ็กสแลชตัวจริง)

### 3. การวาดสัญลักษณ์วงจรมาตรฐาน IEEE/IEC (Schematic Vector Standards):
- **BJT Standard:**
  - แผ่น Base หนาแนวตั้ง (`lineWidth = 3.5px`, ปลายมน) เชื่อมต่อกับสายขั้ว B ทางซ้าย
  - ขา Collector เอียงทแยงขึ้นบนขวา ขา Emitter เอียงทแยงลงล่างขวา
  - หัวลูกศรบน Emitter: **NPN ชี้พุ่งออก ($\searrow$)**, **PNP ชี้พุ่งเข้า ($
warrow$)**
  - ตัวถังวงกลมโปร่งแสงบาง (`lineWidth = 1.8px`) ไม่ใช้สีทึบตัน
  - ป้ายกำกับขั้ว B (เหลือง), C (ฟ้า), E (เขียว/ส้ม) แยกตำแหน่งชัดเจน
- **Canvas Padding & Layout Safety:**
  - จัดองค์ประกอบใน Canvas ให้มีระยะขอบปลอดภัยอย่างน้อย $40	ext{--}50	ext{ px}$ ทางด้านขวา ป้องกันไม่ให้ปลายสายหรือตัวอักษรล้นขอบ Canvas (Canvas Overflow)

### 4. การจัดการข้อความสูตรและคณิตศาสตร์:
- **ห้ามใช้ Raw LaTeX Escape Artifacts ใน HTML/JS Strings**
- ใช้ **Unicode Characters** (`≈`, `·`, `×`, `≥`, `≤`, `±`, `−`, `Ω`, `μ`, `°`, `β`, `α`, `∥`, `⚡`, `🟢`, `🔴`) ร่วมกับ HTML Tags (`<sub>`, `<sup>`, `<strong>`) เสมอ
- ตรวจสอบ Template Literals ทุกจุดต้องมี `$` นำหน้า เช่น `${vout.toFixed(2)}`

### 5. การส่งออกไฟล์ CSV ภาษาไทย (UTF-8 BOM):
- ต้องขึ้นต้นด้วยรหัส Byte Order Mark: `new Blob([String.fromCharCode(0xFEFF) + csvContent], { type: 'text/csv;charset=utf-8;' })`
