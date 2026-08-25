# แอปการเรียนรู้ทรานซิสเตอร์ BJT (BJT Transistor Learning Lab)

แอปเว็บสื่อการสอนและห้องทดลองเสมือนจริงสำหรับ **ทรานซิสเตอร์ BJT (Bipolar Junction Transistor)** แบบครบวงจร ใช้งานบน Dark Mode Glassmorphism UI พร้อมระบบจำลองวงจร Canvas แบบเรียลไทม์ และระบบเชื่อมต่อ Google Sheets

## การเริ่มต้นใช้งาน (Getting Started)

### การรันแบบ Local Server (Node.js)

```bash
# 1. เข้าไปยังโฟลเดอร์แอป
cd d:\ELEC_WEB_APP\bjt_app

# 2. เริ่มต้นเซิร์ฟเวอร์
npm start
# หรือ node server.js

# 3. เปิดเว็บเบราว์เซอร์
# http://localhost:3004/
```

## 5 โมดูลการเรียนรู้หลัก

1. **โครงสร้าง BJT (BJT Structure & Physics):** จำลองสารกึ่งตัวนำ N-P-N และ P-N-P การเคลื่อนที่ของ Electron/Hole และ Depletion Region
2. **กราฟลักษณะเฉพาะ (BJT Characteristics):** Live Output Characteristic Curves (IC vs VCE), DC Load Line, และ Q-Point แบบเรียลไทม์
3. **ห้องทดลองวงจรเสมือนจริง (Virtual Circuit Lab):**
   - Common Emitter Amplifier (ขยายสัญญาณ + กลับเฟส 180 องศา)
   - Emitter Follower / Common Collector (Buffer impedance matching)
   - BJT Switch (Digital inverter/load driver)
   - Bias Stability (วิเคราะห์ผลกระทบของอุณหภูมิต่อ Q-Point)
4. **BJT Tester:** เครื่องมือวัดเสมือนจริง TO-92 pinout พร้อมโหมด Diode Test และ Fault Injection
5. **แบบทดสอบ & บันทึกคะแนน (Quiz & Sheets):** 12 ข้อคำถามพร้อมเฉลยและ Export CSV / Google Sheets

## พอร์ตที่ใช้งาน

- **Port 3004** (แยกอิสระจาก diode_app พอร์ต 3003)