---
name: elec_learning_app
description: Comprehensive guidelines, design systems, physical semiconductor models, mathematical simulation engines, and deployment standards for building interactive Electronics Web Learning Labs (Diode, BJT, JFET, MOSFET, Small-Signal, Clippers, Clampers, Multipliers) with Dark Glassmorphism, HTML5 Canvas physics, Dual-Trace Oscilloscope, and Google Sheets integration.
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
| **FET Small-Signal** | `fet_small_signal` | `3005` | โมเดลวงจรสมมูลไฟสลับ FET ($g_m v_{gs}$), CS/CD/CG Amplifiers พร้อมกราฟิกแปลงแบบจำลอง AC, สมการคำนวณ $Z_{in}, Z_{out}, A_v$ สด, Dual-Trace Scope |
| **BJT Small-Signal** | `bjt_small_signal_app` | `3006` | $r_e$ Transistor Model, $h$-Parameter Two-Port, CE/CC/CB Small-Signal Comparison, Phase Shift 180° |
| **FET & MOSFET** | `fet_apps` | `3007` | N/P-JFET, N-D-MOSFET (มี Built-in N-Channel ถาวร), N-E-MOSFET, แกลเลอรีสัญลักษณ์ FET ทุกชนิด, Shockley Curves, Fixed/Self/Divider Bias (แก้สมการกำลังสองสด), FET Tester |
| **Diode Applications** | `diode_application` | `3008` | วงจรตัดรูปคลื่น (Clippers: Series/Parallel/Biased), ยกระดับสัญญาณ (Clampers: Positive/Negative), ทวีแรงดัน (Voltage Multipliers: 2x, 3x, 4x) |

---

## 3. มาตรฐานการจำลองฟิสิกส์และตัวถังจริง (Physical & Package Standards)

### 3.1 ตัวถังไดโอดจริงและการดูแถบคาดแคโทด (Diode Packages & Cathode Band):
- **DO-41 (1N4001–1N4007):** ตัวถังพลาสติกกระบอกสีดำ $ightarrow$ แถบสีเงิน (Silver Stripe) = **Cathode (K)**
- **DO-35 (1N4148):** ตัวถังหลอดแก้วใสสีส้มแดง $ightarrow$ แถบสีดำ (Black Stripe) = **Cathode (K)**
- **Glass Zener (BZX55 / 1N47xx):** หลอดแก้ว $ightarrow$ แถบสีดำ = **Cathode (K)** (ต่อ Reverse Bias เพื่อรักษาระดับแรงดัน $V_Z$)
- **SOD-123 (SMD):** ชิปแบนสีดำ $ightarrow$ แถบเส้นสีขาวหรือรอยบาก Notch = **Cathode (K)**
- **5mm LED:** ขาสั้น / ขอบตัดเรียบ (Flat Edge Notch) = **Cathode (K)**, ขายาว = **Anode (A)**

### 3.2 การเรียงขาของทรานซิสเตอร์ BJT (BJT Model Pinouts):
- **2N3904 / 2N3906 (TO-92 JEDEC สหรัฐฯ):** หันหน้าเรียบเข้าหาตัว $ightarrow$ **1: Emitter (E) • 2: Base (B) • 3: Collector (C)** (E-B-C)
- **BC547 / BC557 (TO-92 ยุโรป Pro-Electron):** หันหน้าเรียบเข้าหาตัว $ightarrow$ **1: Collector (C) • 2: Base (B) • 3: Emitter (E)** (C-B-E ⚠️ สลับด้านกับตระกูล 2N!)
- **2N2222 / 2N2907 (TO-18 Metal Can):** ตัวถังกระป๋องโลหะกลม มีติ่งขอบ (Tab Notch) ชี้ระบุตำแหน่ง **ขา 1: Emitter (E) • 2: Base (B) • 3: Collector (C)**
- **TIP31C / TIP32C (TO-220 Power Package):** หันหน้าพลาสติกเข้าหาตัว $ightarrow$ **1: Base (B) • 2: Collector (C ต่อกับแผ่นโลหะฮีตซิงก์) • 3: Emitter (E)** (B-C-E)

### 3.3 โครงสร้างฟิสิกส์ของ FET และ MOSFET:
- **JFET (Junction FET):** ใช้สารกึ่งตัวนำเนื้อเดียวเป็น Channel มีรอยต่อ PN Gate ขนาบสองข้าง ป้อน Reverse Bias ($V_{GS} < 0$ สำหรับ N-JFET) เพื่อขยาย Depletion Region บีบช่องนำกระแส
- **D-MOSFET (Depletion-Type):** มี **แถบช่องนำกระแสถาวร (Built-in Channel)** เชื่อมต่อระหว่าง Source กับ Drain บนฐานรอง Substrate ใต้ฉนวน $	ext{SiO}_2$ ทำงานได้ทั้งย่าน Depletion ($V_{GS} < 0$) และ Enhancement ($V_{GS} > 0$)
- **E-MOSFET (Enhancement-Type):** **ไม่มีช่องนำกระแสถาวร (Normally OFF)** มีเพียง Substrate คั่นกลาง จะต้องป้อน $V_{GS} > V_{th}$ เพื่อดึงดูดพาหะสร้าง **Inversion Layer** ชั่วคราว
- **Power MOSFET:** ขา Substrate ต่อเชื่อมกับขา Source ภายในตัวถัง ทำให้เกิด **Body Diode (Parasitic Diode)** ต่อคร่อมระหว่าง Source กับ Drain อัตโนมัติ (ทำหน้าที่เป็น Freewheeling Diode)

### 3.4 กฎการจำสัญลักษณ์ของ FET (FET Schematic Symbols Rules):
1. **N-Channel vs P-Channel:** ดูทิศทางหัวลูกศร $ightarrow$ **ชี้เข้า (Point IN) = N-Channel**, **ชี้ออก (Point OUT) = P-Channel**
2. **JFET vs MOSFET:** ดูขา Gate $ightarrow$ **แตะติดเส้น Channel = JFET**, **เว้นวรรคช่องว่างฉนวน $	ext{SiO}_2$ = MOSFET**
3. **D-MOS vs E-MOS:** ดูเส้น Channel $ightarrow$ **เส้นทึบยาว = Depletion (Normally ON)**, **เส้นประ 3 ท่อน = Enhancement (Normally OFF)**

---

## 4. มาตรฐานสูตรและสมการการไบอัส (DC Biasing & Small-Signal Mathematical Engines)

### 4.1 BJT DC Biasing Formulas:
- **Fixed-Bias:**
  $$I_B = \frac{V_{CC} - V_{BE}}{R_B}, \quad I_C = \beta I_B, \quad V_{CE} = V_{CC} - I_C R_C, \quad I_{C(sat)} = \frac{V_{CC}}{R_C}$$
- **Emitter-Stabilized Bias (มี $R_E$):**
  $$I_B = \frac{V_{CC} - V_{BE}}{R_B + (\beta + 1)R_E}, \quad I_E = (\beta + 1)I_B, \quad V_E = I_E R_E, \quad V_{CE} = V_{CC} - I_C R_C - I_E R_E$$
- **Voltage-Divider Bias (Thevenin & Approximate):**
  $$V_{TH} = V_{CC} \cdot \left[\frac{R_2}{R_1 + R_2}\right], \quad R_{TH} = \frac{R_1 R_2}{R_1 + R_2}, \quad I_B = \frac{V_{TH} - V_{BE}}{R_{TH} + (\beta + 1)R_E}$$
  $$\text{Approximate Condition: } \beta R_E \ge 10 R_2 \implies I_C \approx \frac{V_B - 0.7\text{V}}{R_E}$$
- **Collector-Feedback Bias:**
  $$I_B = \frac{V_{CC} - V_{BE}}{R_F + \beta(R_C + R_E)}, \quad V_C = V_{CC} - (I_C + I_B)R_C, \quad V_{CE} = V_C - V_E$$

### 4.2 FET DC Biasing & Shockley Equations:
- **สมการ Shockley:**
  $$I_D = I_{DSS} \cdot \left(1 - \frac{V_{GS}}{V_P}\right)^2$$
- **Self-Bias (การแก้สมการกำลังสองสด):**
  $$V_{GS} = -I_D R_S \implies a I_D^2 + b I_D + c = 0$$
  $$a = I_{DSS} \left(\frac{R_S}{|V_P|}\right)^2, \quad b = -\left[2 I_{DSS} \left(\frac{R_S}{|V_P|}\right) + 1\right], \quad c = I_{DSS}$$
  $$I_D = \frac{-b - \sqrt{b^2 - 4ac}}{2a}$$
- **Transconductance:**
  $$g_{m0} = \frac{2 I_{DSS}}{|V_P|}, \quad g_m = g_{m0} \cdot \left(1 - \frac{V_{GS}}{V_P}\right)$$

### 4.3 Small-Signal AC Models:
- **BJT AC Model:** $r_e = \frac{26\text{mV}}{I_E}$, $A_v = -\frac{R_C}{r_e}$ (CE กลับเฟส 180°)
- **FET AC Model:** แหล่งจ่ายกระแสควบคุมด้วยแรงดัน $g_m v_{gs}$, $Z_{in} = R_G$, $Z_{out} = R_D \parallel r_d$, $A_v = -g_m (R_D \parallel r_d)$ (CS กลับเฟส 180°)

---

## 5. กฎเหล็กทางเทคนิคในการเขียนโค้ด (Crucial Development Rules)

1. **ห้ามใช้ Raw LaTeX ใน HTML/JS Strings:**
   - ห้ามใช้ `\( ... \)` หรือ `$$ ... $$` ในสตริง HTML/JS เนื่องจากเบราว์เซอร์ไม่มี MathJax โหลดล่วงหน้า ให้ใช้ **Unicode Symbols** (`≈`, `·`, `×`, `≥`, `≤`, `±`, `−`, `Ω`, `μ`, `°`, `β`, `α`, `∥`, `⚡`, `🟢`, `🔴`) ร่วมกับแท็ก HTML (`<sub>`, `<sup>`, `<strong>`) เสมอ
2. **Animation Loop & Canvas Sub-Tab Handling:**
   - ในฟังก์ชัน `mainLoop()` ที่รัน `requestAnimationFrame` ต้องตรวจสอบ `state.activeTab` และ `state.subTab` เสมอ เพื่อเรนเดอร์ Canvas ที่กำลังแสดงผลอยู่ต่อเนื่อง 60 FPS ป้องกันปัญหาแคนวาสค้างหรือเป็นสีดำ
3. **การตรวจสอบฟังก์ชันวาดพื้นฐาน (Drawing Primitives):**
   - ตรวจสอบว่าฟังก์ชันช่วยเหลือ เช่น `drawArrow()`, `dotNode()`, `wire()`, `gndSymbol()`, `vccRail()` ได้รับการประกาศและพร้อมใช้งานใน Scope เสมอ
4. **การ Export ไฟล์ CSV ภาษาไทย:**
   - ต้องขึ้นต้นด้วย UTF-8 BOM เสมอ: `new Blob([String.fromCharCode(0xFEFF) + csvContent], { type: 'text/csv;charset=utf-8;' })` เพื่อเปิดใน Microsoft Excel ภาษาไทยได้ทันทีโดยไม่เพี้ยน
5. **การตรวจสอบความถูกต้องก่อนส่งมอบ (Validation):**
   - รันการทดสอบ Node.js `new vm.Script(code)` เพื่อยืนยันว่า **มี 0 Syntax Errors** และตรวจสอบ DOM ID ทุกตัวว่าเชื่อมโยงถูกต้องสมบูรณ์ 100%
