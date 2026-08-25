# คู่มือระบบจำลองมัลติมิเตอร์แบบอนาล็อก (Analog Multimeter Simulator Web App)

โปรเจกต์นี้คือเว็บแอปพลิเคชันจำลองเครื่องมัลติมิเตอร์แบบอนาล็อก (มิเตอร์เข็มชี้) ที่มีความเสมือนจริงสูง เหมาะสำหรับการศึกษาฝึกฝนการอ่านค่าหน้าปัดสเกลการวัดแรงดันไฟฟ้ากระแสตรง (DCV), สเกลกระแสไฟฟ้าสลับ (ACV), สเกลกระแสตรง (DCA) และสเกลความต้านทานไฟฟ้า (Ohms Ω) แบบไม่ใช่เชิงเส้น พร้อมจำลองกลไกฟิสิกส์การดีดสปริงเข็มและการเชื่อมต่อบันทึกประวัติกับ **Google Sheets**

---

## 📂 โครงสร้างไฟล์ในโปรเจกต์
- [multimeter.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/multimeter.html) - หน้าเว็บเครื่องมัลติมิเตอร์อนาล็อก (Frontend + Canvas เรนเดอร์หน้าปัดเข็มฟิสิกส์)
- [Code.gs](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/Code.gs) - สคริปต์เซิร์ฟเวอร์ Google Apps Script (Backend) สำหรับบันทึกประวัติลงชีตของมัลติมิเตอร์ และกำหนดหน้าเว็บเพจคู่หรือเพจสามแอป
- [server.js](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/server.js) - เซิร์ฟเวอร์จำลองขนาดจิ๋วเพื่อรันเครื่องมัลติมิเตอร์ในเครื่องของคุณ
- [package.json](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/package.json) - คอนฟิกโครงการสำหรับการเริ่มรันคำสั่งเริ่มเซิร์ฟเวอร์

---

## 🚀 วิธีการทดสอบรันในเครื่องตัวเอง (Local Preview)

คุณสามารถทดสอบใช้งานระบบบนเครื่องคอมพิวเตอร์ของคุณได้ 2 วิธีดังนี้:

### วิธีที่ 1: รันแบบไม่ต้องใช้เซิร์ฟเวอร์ (Zero-Server Mode - ง่ายที่สุด)
1. เปิดโฟลเดอร์โครงการ:
   `C:\Users\terd2\.gemini\antigravity\scratch\multimeter_app\`
2. ดับเบิ้ลคลิกที่ไฟล์ **[multimeter.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/multimeter.html)** (หรือลากไฟล์ไปวางในเบราว์เซอร์ Google Chrome)
3. หน้าต่างแอปจะเปิดขึ้นมาทันทีโดยระบบจะรันในโหมดจำลอง (`Local Mode`) และบันทึกประวัติการวัดไว้ใน `localStorage` ของเบราว์เซอร์แทนชีตจริง

### วิธีที่ 2: รันด้วยเซิร์ฟเวอร์จำลอง (หากมี Node.js ติดตั้งในเครื่อง)
1. เปิด Terminal หรือ Command Prompt ในโฟลเดอร์นี้
2. รันคำสั่ง:
   ```bash
   npm start
   ```
3. เปิดเว็บเบราว์เซอร์ไปที่: [http://localhost:3000/](http://localhost:3000/)

---

## 📊 วิธีการติดตั้งและ Deploy บน Google Sheets (ใช้งานจริง)

หากต้องการเชื่อมต่อบันทึกประวัติร่วมกับไฟล์ Google Sheets จริง ให้ทำตามขั้นตอนดังนี้:

### กรณีที่ 1: ติดตั้งรวมเป็นโปรเจกต์เดียวกันกับแอปเดิม (แอปตัวต้านทาน + ออสซิลโลสโคป) 🌟
โค้ดในไฟล์ **[Code.gs](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/Code.gs)** ได้รับการออกแบบให้สามารถทำงานร่วมกันเป็นสามหน้า (Multi-page App) ได้ทันที:
1. ไปที่โปรเจกต์ Apps Script เดิมของคุณในเบราว์เซอร์
2. สร้างไฟล์ **HTML** เพิ่มขึ้นมาใหม่อีกไฟล์ ตั้งชื่อว่า **`multimeter`** (จะได้ไฟล์ชื่อ `multimeter.html`)
3. คัดลอกโค้ดทั้งหมดในไฟล์ **[multimeter.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/multimeter.html)** ไปวางทับทั้งหมดในไฟล์ที่สร้างขึ้นใหม่
4. เปิดไฟล์ **`Code.gs`** ในหน้าสคริปต์ แล้วแก้ไขฟังก์ชัน `doGet(e)` และเพิ่มฟังก์ชันบันทึกข้อมูลของมัลติมิเตอร์ โดยคัดลอกส่วนที่อัปเดตจากไฟล์ **[Code.gs](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/Code.gs)** ในโปรเจกต์นี้
5. กดปุ่ม 💾 (บันทึกโครงการ) และทำการ **Deploy ใหม่ (New deployment)**
6. **วิธีการเข้าใช้งานหน้าต่าง ๆ:**
   - เข้าหน้า **Multimeter (หน้าจอมิเตอร์เข็ม)**: ใช้ URL ตั้งต้นของเว็บแอป
   - เข้าหน้า **Oscilloscope (หน้าจอคลื่น)**: เติม `?page=oscilloscope` ต่อท้าย URL
   - เข้าหน้า **Resistor (หน้าจออ่านแถบสี)**: เติม `?page=resistor` ต่อท้าย URL

### กรณีที่ 2: ติดตั้งแยกเป็นอีกหนึ่งสเปรดชีตต่างหาก
1. สร้าง Google Sheet แผ่นใหม่ขึ้นมาใน Google Drive
2. ไปที่ **ส่วนขยาย (Extensions)** -> **Apps Script**
3. คัดลอกเนื้อหาทั้งหมดใน **[Code.gs](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/Code.gs)** ไปทับโค้ดในไฟล์ชื่อ `Code.gs` ของโครงการสคริปต์
4. กดเพิ่มไฟล์ **HTML** ตั้งชื่อว่า `multimeter` แล้วคัดลอกโค้ดทั้งหมดจาก **[multimeter.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/multimeter_app/multimeter.html)** ไปใส่ในนั้น
5. กดปุ่ม 💾 (บันทึกโครงการ)
6. คลิกที่ปุ่ม **Deploy (การใช้งานใช้ได้จริง)** -> เลือกประเภทเป็น **Web App (เว็บแอป)**
   - ตั้งค่าสิทธิ์ "Execute as" เป็น **Me**
   - ตั้งค่าสิทธิ์ "Who has access" เป็น **Everyone**
7. คลิก **Deploy** และอนุมัติสิทธิ์การเข้าถึงข้อมูลตามขั้นตอนปกติ
8. คัดลอกลิงก์ **Web App URL** เพื่อเข้าใช้งานเครื่องมัลติมิเตอร์ที่จะจัดเก็บข้อมูลประวัติลงชีตของจริง!
   *(ระบบจะสร้างแท็บชีตชื่อ **"Multimeter Log"** ให้คุณโดยอัตโนมัติเมื่อกดบันทึกข้อมูลครั้งแรก)*
