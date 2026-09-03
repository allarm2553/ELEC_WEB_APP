---
name: elec_learning_app
description: Comprehensive guidelines, design systems, physical semiconductor models, mathematical simulation engines, and deployment standards for building interactive Electronics Web Learning Labs (Diode, BJT, JFET, MOSFET, Op-Amp, Small-Signal, Clippers, Clampers, Multipliers) with Dark Glassmorphism, HTML5 Canvas physics, Dual-Trace Oscilloscope, and Google Sheets integration.
---

# Electronics Web Learning Lab & Virtual Simulator Skill Guide

คู่มือและมาตรฐานการพัฒนาแอปพลิเคชันเว็บเพื่อการเรียนรู้วิชาอิเล็กทรอนิกส์ (Electronics Web Learning Lab) ในรูปแบบ Interactive Single-Page Application (SPA) พร้อมห้องทดลองเสมือนจริง, การคำนวณสดทีละขั้นตอน (Live Step-by-Step Math Solvers), ฟิสิกส์สารกึ่งตัวนำบน HTML5 Canvas, ออสซิลโลสโคป 2 แชนแนล, และระบบบันทึกผลการเรียนรู้ผ่าน Google Sheets

---

## 1. สถาปัตยกรรมแอปพลิเคชัน (Application Architecture)

แต่ละแอปพลิเคชันถูกออกแบบให้เป็น **Self-contained Single-Page App (SPA)** โดยไม่มี External Frameworks (Vanilla JS + CSS3 + HTML5 Canvas + Web Audio API) ภายใต้โครงสร้างไฟล์มาตรฐาน:

```
d:\ELEC_WEB_APP\<app_name>\
├── index.html        # Single-Page Web Application รวม CSS, DOM, HTML5 Canvas, Web Audio และ JS Logic
├── server.js         # Node.js Native HTTP Server (No external npm dependencies)
├── package.json      # NPM Metadata พร้อม script "start": "node server.js"
├── Code.gs           # Google Apps Script Backend สำหรับบันทึกคะแนนเข้า Google Sheets
└── README.md         # เอกสารแนะนำการใช้งาน วงจร และคู่มือการติดตั้งภาษาไทย
```

---

## 2. พอร์ตมาตรฐานของแต่ละแอปพลิเคชัน (Port Assignment Mapping)

| แอปพลิเคชัน | โฟลเดอร์ | พอร์ต | เนื้อหาและจุดเด่นหลัก |
| :--- | :--- | :---: | :--- |
| **Diode Basics** | `diode_app` | `3003` | ฟิสิกส์ PN Junction, การไบอัสไดโอด, ตัวถังไดโอดจริง (DO-41, DO-35, SOD-123, LED แถบคาด Cathode), วงจรเรียงกระแส (Rectifiers), ซีเนอร์ไดโอด |
| **BJT Transistor** | `bjt_app` | `3004` | โครงสร้าง NPN/PNP, DC Load Line, วงจรไบอัสไฟตรง (Fixed-Bias, Emitter-Stabilized, Voltage-Divider, Collector-Feedback, CE Amp, BJT Switch), BJT Tester (การเรียงขาจริง TO-92 US/EU, TO-18, TO-220) |
| **FET Small-Signal** | `fet_small_signal` | `3005` | โมเดลวงจรสมมูลไฟสลับ FET ($g_m v_{gs}$), CS/CD/CG Amplifiers, กราฟถ่ายโอน JFET/E-MOSFET, สมการคำนวณ $Z_{in}, Z_{out}, A_v$ สด, Dual-Trace Scope |
| **BJT Small-Signal** | `bjt_small_signal_app` | `3006` | $r_e$ Transistor Model, $h$-Parameter Two-Port, CE/CC/CB Small-Signal Comparison, Phase Shift 180° |
| **FET & MOSFET** | `fet_apps` | `3007` | N/P-JFET, N-D-MOSFET (มี Built-in N-Channel ถาวร), N-E-MOSFET, แกลเลอรีสัญลักษณ์ FET ทุกชนิด, Shockley Curves, Fixed/Self/Divider Bias (แก้สมการกำลังสองสด), FET Tester |
| **Diode Applications** | `diode_application` | `3008` | วงจรตัดรูปคลื่น (Clippers: Series/Parallel/Biased), ยกระดับสัญญาณ (Clampers: Positive/Negative), ทวีแรงดัน (Voltage Multipliers: 2x, 3x, 4x) |
| **Op-Amp Lab** | `opamp` | `3009` | โครงสร้าง Op-Amp อุดมคติ vs ของจริง, ผังขาไอซีจริง (741, LM358, TL082, NE5532, OP07, LM324), วงจรขยายกลับเฟส, ไม่กลับเฟส, Buffer, Summing, Diff, Inst Amp, Comparator, Schmitt Trigger, Integrator, Active Filter, Dual Scope |

---

## 3. มาตรฐานการจำลองฟิสิกส์และตัวถังจริง (Physical & Package Standards)

### 3.1 ตัวถังไดโอดจริงและการดูแถบคาดแคโทด (Diode Packages & Cathode Band):
- **DO-41 (1N4001–1N4007):** ตัวถังพลาสติกกระบอกสีดำ $\rightarrow$ แถบสีเงิน (Silver Stripe) = **Cathode (K)**
- **DO-35 (1N4148):** ตัวถังหลอดแก้วใสสีส้มแดง $\rightarrow$ แถบสีดำ (Black Stripe) = **Cathode (K)**
- **Glass Zener (BZX55 / 1N47xx):** หลอดแก้ว $\rightarrow$ แถบสีดำ = **Cathode (K)** (ต่อ Reverse Bias เพื่อรักษาระดับแรงดัน $V_Z$)
- **SOD-123 (SMD):** ชิปแบนสีดำ $\rightarrow$ แถบเส้นสีขาวหรือรอยบาก Notch = **Cathode (K)**
- **5mm LED:** ขาสั้น / ขอบตัดเรียบ (Flat Edge Notch) = **Cathode (K)**, ขายาว = **Anode (A)**

### 3.2 การเรียงขาของทรานซิสเตอร์ BJT (BJT Model Pinouts):
- **2N3904 / 2N3906 (TO-92 JEDEC สหรัฐฯ):** หันหน้าเรียบเข้าหาตัว $\rightarrow$ **1: Emitter (E) • 2: Base (B) • 3: Collector (C)** (E-B-C)
- **BC547 / BC557 (TO-92 ยุโรป Pro-Electron):** หันหน้าเรียบเข้าหาตัว $\rightarrow$ **1: Collector (C) • 2: Base (B) • 3: Emitter (E)** (C-B-E ⚠️ สลับด้านกับตระกูล 2N!)
- **2N2222 / 2N2907 (TO-18 Metal Can):** ตัวถังกระป๋องโลหะกลม มีติ่งขอบ (Tab Notch) ชี้ระบุตำแหน่ง **ขา 1: Emitter (E) • 2: Base (B) • 3: Collector (C)**
- **TIP31C / TIP32C (TO-220 Power Package):** หันหน้าพลาสติกเข้าหาตัว $\rightarrow$ **1: Base (B) • 2: Collector (C ต่อกับแผ่นโลหะฮีตซิงก์) • 3: Emitter (E)** (B-C-E)

### 3.3 การเรียงขาของไอซีออปแอมป์ยอดนิยม (Op-Amp IC Pinouts):
- **$\mu\text{A741}$ (Single DIP-8):** ขา 1: Offset Null, 2: Inverting (−), 3: Non-Inverting (+), 4: $V^-$ / $V_{EE}$, 5: Offset Null, 6: Output, 7: $V^+$ / $V_{CC}$, 8: NC
- **LM358 (Dual DIP-8):** ไฟเดี่ยว $+3\text{V}$ ถึง $+32\text{V}$ $\rightarrow$ ขา 1: 1OUT, 2: 1IN−, 3: 1IN+, 4: GND/V−, 5: 2IN+, 6: 2IN−, 7: 2OUT, 8: V+
- **TL082 / TL072 (Dual JFET DIP-8):** อิมพีแดนซ์อินพุต $10^{12}\ \Omega$, Slew Rate $13\ \text{V}/\mu\text{s}$ (ผังขาตรงกับ LM358)
- **NE5532 (Dual Audio DIP-8):** สัญญาณรบกวนต่ำพิเศษ ขับโหลด $600\ \Omega$ ได้ (ผังขาตรงกับ LM358)
- **OP07 (Precision DIP-8):** แรงดันออฟเซ็ตต่ำพิเศษ $V_{OS} \le 75\ \mu\text{V}$, CMRR $120\text{ dB}$ (มีขา Trim 1 และ 8)
- **LM324 (Quad DIP-14):** บรรจุ 4 Op-Amps ในตัวถัง 14 ขา

---

## 4. มาตรฐานสูตรและสมการการคำนวณ (Mathematical Simulation Engines)

### 4.1 Op-Amp Circuit Equations:
- **Inverting Amplifier:** $A_v = -\frac{R_f}{R_1}$, $V_{out} = -\left(\frac{R_f}{R_1}\right) V_{in}$, $Z_{in} = R_1$, Virtual Ground $V_- = 0\text{V}$ (กลับเฟส $180^\circ$)
- **Non-Inverting Amplifier:** $A_v = 1 + \frac{R_f}{R_1}$, $V_{out} = \left(1 + \frac{R_f}{R_1}\right) V_{in}$, $Z_{in} \approx \infty$ (ตรงเฟส $0^\circ$)
- **Voltage Follower / Buffer:** $A_v = 1.00$, $V_{out} = V_{in}$, $Z_{in} \approx \infty$, $Z_{out} \approx 0$
- **Summing Amplifier:** $V_{out} = -R_f \left(\frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3}\right)$
- **Difference Amplifier:** $V_{out} = \frac{R_2}{R_1} (V_2 - V_1)$ (เมื่อ $R_1=R_3, R_2=R_4$)
- **Instrumentation Amplifier:** $A_v = \left(1 + \frac{2R_1}{R_G}\right) \frac{R_3}{R_2}$
- **Schmitt Trigger:** $V_{UT} = +\frac{R_1}{R_1 + R_2} V_{sat}$, $V_{LT} = -\frac{R_1}{R_1 + R_2} V_{sat}$, $V_H = V_{UT} - V_{LT}$
- **Active Low-Pass Filter:** $f_c = \frac{1}{2\pi R C}$

---

## 5. กฎเหล็กทางเทคนิคในการเขียนโค้ด (Crucial Development Rules)

1. **ห้ามใช้ Raw LaTeX ใน HTML/JS Strings:**
   - ห้ามใช้ `\( ... \)` หรือ `$$ ... $$` ในสตริง HTML/JS เนื่องจากเบราว์เซอร์ไม่มี MathJax โหลดล่วงหน้า ให้ใช้ **Unicode Symbols** (`≈`, `·`, `×`, `≥`, `≤`, `±`, `−`, `Ω`, `μ`, `°`, `β`, `α`, `∥`, `⚡`, `🟢`, `🔴`) ร่วมกับแท็ก HTML (`<sub>`, `<sup>`, `<strong>`) เสมอ
2. **Animation Loop & Canvas Sub-Tab Handling:**
   - ในฟังก์ชัน `mainLoop()` ที่รัน `requestAnimationFrame` ต้องตรวจสอบ `state.activeTab` และ `state.subTab` เสมอ เพื่อเรนเดอร์ Canvas ที่กำลังแสดงผลอยู่ต่อเนื่อง 60 FPS ป้องกันปัญหาแคนวาสค้างหรือเป็นสีดำ
3. **การตรวจสอบฟังก์ชันวาดพื้นฐาน (Drawing Primitives):**
   - ตรวจสอบว่าฟังก์ชันช่วยเหลือ เช่น `drawArrow()`, `dotNode()`, `wire()`, `gndSymbol()`, `vddRail()`, `drawResistorH()`, `drawResistorV()` ได้รับการประกาศและพร้อมใช้งานใน Scope เสมอ
4. **การ Export ไฟล์ CSV ภาษาไทย:**
   - ต้องขึ้นต้นด้วย UTF-8 BOM เสมอ: `new Blob([String.fromCharCode(0xFEFF) + csvContent], { type: 'text/csv;charset=utf-8;' })` เพื่อเปิดใน Microsoft Excel ภาษาไทยได้ทันทีโดยไม่เพี้ยน
5. **การตรวจสอบความถูกต้องก่อนส่งมอบ (Validation):**
   - รันการทดสอบ Node.js `new vm.Script(code)` เพื่อยืนยันว่า **มี 0 Syntax Errors** และตรวจสอบ DOM ID ทุกตัวว่าเชื่อมโยงถูกต้องสมบูรณ์ 100%
