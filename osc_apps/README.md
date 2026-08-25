# คู่มือระบบจำลองและวิเคราะห์ออสซิลโลสโคป (Oscilloscope Simulator & Analyzer Web App)

โปรเจกต์นี้คือเว็บแอปพลิเคชันจำลองเครื่องออสซิลโลสโคปแบบโต้ตอบ (Interactive Oscilloscope) เหมาะสำหรับการเรียนรู้เรื่องการอ่านค่าคลื่นความถี่สัญญาณไฟฟ้า คลื่นไซน์ สี่เหลี่ยม สามเหลี่ยม การตั้งค่าทริกเกอร์ (Trigger), โหมดวัดค่าแนวแกน XY (Lissajous curves) และการใช้ไม้บรรทัดวัดระยะคลื่น (Cursors) พร้อมเชื่อมต่อข้อมูลประวัติเข้ากับ **Google Sheets**

---

## 📂 โครงสร้างไฟล์ในโปรเจกต์
- [oscilloscope.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/oscilloscope.html) - หน้าเว็บเครื่องออสซิลโลสโคปและเครื่องกำเนิดสัญญาณ (Frontend + GUI Canvas)
- [Code.gs](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/Code.gs) - สคริปต์เซิร์ฟเวอร์ Google Apps Script (Backend) รองรับการเขียนและดึงตารางข้อมูลวัดคลื่น และฟังก์ชันกำหนดหน้าเว็บเพจคู่
- [server.js](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/server.js) - เซิร์ฟเวอร์จำลองขนาดจิ๋วเพื่อรันเครื่องออสซิลโลสโคปบนเครื่องคอมพิวเตอร์ของคุณ
- [package.json](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/package.json) - ค่าคอนฟิกเริ่มต้นสำหรับรันคำสั่งเริ่มเซิร์ฟเวอร์จำลอง

---

## 🚀 วิธีการทดสอบรันในเครื่องตัวเอง (Local Preview)

คุณสามารถทดสอบใช้งานระบบบนเครื่องคอมพิวเตอร์ของคุณได้ 2 วิธีดังนี้:

### วิธีที่ 1: รันด้วยเซิร์ฟเวอร์จำลอง (หากมี Node.js ติดตั้งในเครื่อง)
1. เปิด Terminal หรือ Command Prompt ในโฟลเดอร์นี้
2. รันคำสั่ง:
   ```bash
   npm start
   ```
3. เปิดเว็บเบราว์เซอร์ไปที่: [http://localhost:3000/](http://localhost:3000/) (ระบบจะแสดงหน้าจอออสซิลโลสโคปขึ้นมาทันที)

### วิธีที่ 2: รันแบบไม่ต้องใช้เซิร์ฟเวอร์ (Zero-Server Mode)
1. เปิดโฟลเดอร์โครงการ:
   `C:\Users\terd2\.gemini\antigravity\scratch\osc_apps\`
2. ดับเบิ้ลคลิกที่ไฟล์ **[oscilloscope.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/oscilloscope.html)** (หรือลากไฟล์ไปวางในเบราว์เซอร์ Google Chrome)

*ระบบจะทำงานในโหมดจำลอง (`Local Mode`) และบันทึกประวัติการวัดไว้ใน `localStorage` ของเบราว์เซอร์แทนชีตจริง เพื่อความสะดวกในการทดลองเล่นโดยไม่ต้องมีเซิร์ฟเวอร์*

---

## 📊 วิธีการติดตั้งและ Deploy บน Google Sheets (ใช้งานจริง)

หากต้องการเชื่อมต่อบันทึกประวัติร่วมกับไฟล์ Google Sheets จริง ให้ทำตามขั้นตอนดังนี้:

### กรณีที่ 1: ติดตั้งรวมเป็นโปรเจกต์เดียวกันกับแอป "อ่านค่าแถบสีตัวต้านทาน" (แนะนำ 🌟)
ถ้าคุณมีสคริปต์ Apps Script ของแถบสีตัวต้านทานอยู่แล้ว คุณสามารถรวมหน้าเข้าด้วยกันได้ทันที:
1. ไปที่โปรเจกต์ Apps Script เดิมของคุณในเบราว์เซอร์
2. ที่แถบเมนูด้านซ้าย คลิกปุ่ม **+** ถัดจากเมนู "ไฟล์" -> เลือก **HTML**
3. ตั้งชื่อไฟล์นี้ว่า **`oscilloscope`** (จะได้ไฟล์ชื่อ `oscilloscope.html`)
4. คัดลอกโค้ดทั้งหมดในไฟล์ **[oscilloscope.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/oscilloscope.html)** ไปวางทับเนื้อหาทั้งหมด
5. เปิดไฟล์ **`Code.gs`** เดิมของคุณ แล้วแทนที่ฟังก์ชัน `doGet(e)` และเพิ่มฟังก์ชันออสซิลโลสโคปด้วยโค้ดจากไฟล์ **[Code.gs](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/Code.gs)** ในโปรเจกต์นี้
6. กดปุ่ม 💾 (บันทึกโครงการ) และทำการ **Deploy ใหม่ (New deployment)**
7. **วิธีการเข้าใช้งาน:**
   - URL ตั้งต้นของเว็บแอป จะแสดงหน้า **Oscilloscope** เป็นหน้าหลัก
   - หากต้องการสลับไปใช้หน้าคำนวณตัวต้านทาน ให้เติม `?page=resistor` ต่อท้าย URL เว็บแอป (เช่น `https://script.google.com/.../exec?page=resistor`)

### กรณีที่ 2: ติดตั้งแยกเป็นอีกหนึ่งสเปรดชีตต่างหาก
1. สร้าง Google Sheet แผ่นใหม่ขึ้นมาใน Google Drive
2. ไปที่ **ส่วนขยาย (Extensions)** -> **Apps Script**
3. คัดลอกเนื้อหาทั้งหมดใน **[Code.gs](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/Code.gs)** ไปทับโค้ดในไฟล์ชื่อ `Code.gs` ของโครงการสคริปต์
4. กดเพิ่มไฟล์ **HTML** ตั้งชื่อว่า `oscilloscope` แล้วคัดลอกโค้ดทั้งหมดจาก **[oscilloscope.html](file:///C:/Users/terd2/.gemini/antigravity/scratch/osc_apps/oscilloscope.html)** ไปใส่ในนั้น
5. กดปุ่ม 💾 (บันทึกโครงการ)
6. คลิกที่ปุ่ม **Deploy (การใช้งานใช้ได้จริง)** -> เลือกประเภทเป็น **Web App (เว็บแอป)**
   - ตั้งค่าสิทธิ์ "Execute as" เป็น **Me**
   - ตั้งค่าสิทธิ์ "Who has access" เป็น **Anyone**
7. คลิก **Deploy** และอนุมัติสิทธิ์การเข้าถึงข้อมูลตามขั้นตอนปกติ
8. คัดลอกลิงก์ **Web App URL** เพื่อเข้าใช้งานเครื่องออสซิลโลสโคปที่จะจัดเก็บข้อมูลประวัติลงชีตของจริง!
   *(ระบบจะสร้างแท็บชีตชื่อ **"Oscilloscope Log"** ให้คุณโดยอัตโนมัติเมื่อกดบันทึกข้อมูลครั้งแรก)*
