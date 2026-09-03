# แอปการเรียนรู้ออปแอมป์ (Op-Amp Interactive Learning Lab)

แอปเว็บสื่อการสอนและห้องทดลองเสมือนจริงสำหรับ **ออปแอมป์ (Operational Amplifier: Op-Amp)** ครบถ้วนทั้งโครงสร้าง, สัญลักษณ์, ผังขาไอซีจริง (741, LM358, TL082, NE5532, OP07, LM324), วงจรขยายกลับเฟส, ไม่กลับเฟส, วงจรรวม/ลบสัญญาณ, วงจรเปรียบเทียบ, ชมิตต์ทริกเกอร์, อินทิเกรเตอร์, พร้อมออสซิลโลสโคป 2 แชนแนล และระบบแบบทดสอบบันทึก Google Sheets

---

## การเริ่มต้นใช้งาน (Getting Started)

### การรันแบบ Local Server
```bash
# 1. เข้าไปยังโฟลเดอร์แอป
cd d:\ELEC_WEB_APP\opamp

# 2. เริ่มต้นเซิร์ฟเวอร์
node server.js
# หรือ npm start

# 3. เปิดเบราว์เซอร์
# http://localhost:3009/
```

---

## โมดูลการเรียนรู้ (Learning Modules)

1. **โมดูล 1: โครงสร้าง & สัญลักษณ์ (Structure, Symbol & IC Models)**
   - คุณลักษณะอุดมคติ vs ของจริง ($A_{OL}, Z_{in}, Z_{out}, \text{BW}, \text{Slew Rate}, \text{CMRR}$)
   - มโนทัศน์ **Virtual Short** และ **Virtual Ground**
   - แกลเลอรีสัญลักษณ์วงจร & ผังขาไอซีจริง (741, LM358, TL082, NE5532, OP07, LM324)

2. **โมดูล 2: วงจรขยายพื้นฐาน & คำนวณสด (Fundamental Amplifiers)**
   - วงจรขยายกลับเฟส (**Inverting Amplifier** $A_v = -R_f/R_1$, $180^\circ$)
   - วงจรขยายไม่กลับเฟส (**Non-Inverting Amplifier** $A_v = 1 + R_f/R_1$, $0^\circ$)
   - วงจรตามแรงดัน (**Voltage Follower / Buffer**)
   - วงจรรวมสัญญาณ (**Summing Amplifier**)
   - วงจรลบแรงดัน (**Difference Amplifier**)
   - วงจรขยายเครื่องมือวัด (**Instrumentation Amplifier**)

3. **โมดูล 3: วงจรเปรียบเทียบและประมวลผลสัญญาณ (Comparators & Signal Processors)**
   - วงจรเปรียบเทียบแรงดัน (**Comparator** $+V_{sat} / -V_{sat}$)
   - วงจรชมิตต์ทริกเกอร์ (**Schmitt Trigger** มี Hysteresis $V_{UT}, V_{LT}$)
   - วงจรอินทิเกรต (**Integrator**) & ดิฟเฟอเรนชิเอต (**Differentiator**)
   - วงจรกรองแอกทีฟ (**Active Filter**)

4. **โมดูล 4: ห้องทดลองเสมือนจริง & ออสซิลโลสโคป 2 แชนแนล (Virtual Lab & Dual-Trace Scope)**
   - Dual-Trace Scope (CH1 เหลือง $V_{in}$ vs CH2 ฟ้า $V_{out}$)
   - จำลองการตัดยอดคลื่น Saturation Clipping เมื่อขยายเกินไฟเลี้ยง $\pm V_{sat}$
   - ปรับความถี่, รูปคลื่น (Sine, Square, Triangle), $V_{in}, R_1, R_f, C, V_{CC}/V_{EE}$

5. **โมดูล 5: แบบทดสอบความรู้ 12 ข้อ & บันทึก Google Sheets**
   - 12 ข้อปรนัยภาษาไทยพร้อมเฉลยละเอียด
   - บันทึกผลลง Google Sheets และ Export CSV ภาษาไทย (UTF-8 BOM)

---

## พอร์ต (Port)
แอปนี้รันบน Port **3009**
