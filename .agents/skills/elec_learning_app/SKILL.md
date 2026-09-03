---
name: elec_learning_app
description: Comprehensive guidelines, design systems, physical semiconductor models, mathematical simulation engines, and deployment standards for building interactive Electronics Web Learning Labs (Diode, BJT, JFET, MOSFET, Op-Amp, Small-Signal, Clippers, Clampers, Multipliers, Multimeter, Oscilloscope, Resistor) with Dark Glassmorphism, HTML5 Canvas physics, Dual-Trace Oscilloscope, Master Unified Portal, and Google Sheets integration.
---

# Electronics Web Learning Lab & Virtual Simulator Skill Guide

คู่มือและมาตรฐานการพัฒนาแอปพลิเคชันเว็บเพื่อการเรียนรู้วิชาอิเล็กทรอนิกส์ (Electronics Web Learning Lab) ในรูปแบบ Interactive Single-Page Application (SPA) พร้อมหน้า **Master Dashboard Portal** รวมศูนย์, ห้องทดลองเสมือนจริง, การคำนวณสดทีละขั้นตอน (Live Step-by-Step Math Solvers), ฟิสิกส์สารกึ่งตัวนำบน HTML5 Canvas, ออสซิลโลสโคป 2 แชนแนล, และระบบบันทึกผลการเรียนรู้ผ่าน Google Sheets

---

## 1. สถาปัตยกรรมระบบรวมศูนย์ (Master Portal & App Architecture)

ระบบประกอบด้วยหน้า **Master Dashboard Portal (`index.html`)** ที่ Root Directory ควบคู่กับ **Master Unified HTTP Server (`server.js`)** บนพอร์ต **8080** ซึ่งทำหน้าที่เป็น Single Entry Point ให้ผู้เรียนสามารถเข้าถึง 10 แอปพลิเคชันการเรียนรู้ได้ผ่าน Sub-paths โดยไม่ต้องเปิดแยกทีละเซิร์ฟเวอร์:

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

## 2. พอร์ตและเส้นทางเข้าถึงแอปพลิเคชัน (Port & Route Mapping)

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

## 3. กฎเหล็กทางเทคนิคในการพัฒนา (Core Architectural Rules)

1. **ห้ามใช้ Raw LaTeX ใน HTML/JS Strings:**
   - ใช้ **Unicode Symbols** (`≈`, `·`, `×`, `≥`, `≤`, `±`, `−`, `Ω`, `μ`, `°`, `β`, `α`, `∥`, `⚡`, `🟢`, `🔴`) ร่วมกับแท็ก HTML (`<sub>`, `<sup>`, `<strong>`) เสมอ
2. **Template Literals Interpolation:**
   - ตรวจสอบเครื่องหมาย `$` หน้าวงเล็บปีกกาเสมอ เช่น `${av.toFixed(2)}`, `${vout.toFixed(2)}` ป้องกันการแสดงผลข้อความดิบ `{...}`
3. **Sub-Path Relative Link Handling:**
   - ใน `server.js` เมื่อมีการเรียก Sub-path ที่ไม่มี Trailing Slash (เช่น `/diode`) ต้องทำ HTTP 302 Redirect ไปยัง `/diode/` เพื่อให้เบราว์เซอร์โหลด Assets สัมพัทธ์ได้อย่างถูกต้อง
4. **Self-Contained Execution:**
   - แต่ละแอปพลิเคชันสามารถเปิดใช้งานได้ทั้งแบบ Direct File Protocol (`file:///...`), Dedicated Standalone Server (Port 3000–3009), และผ่าน Master Unified Server (Port 8080)
5. **การ Export ไฟล์ CSV ภาษาไทย:**
   - ต้องขึ้นต้นด้วย UTF-8 BOM เสมอ: `new Blob([String.fromCharCode(0xFEFF) + csvContent], { type: 'text/csv;charset=utf-8;' })`
