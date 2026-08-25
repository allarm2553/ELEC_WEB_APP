# แอปการเรียนรู้: การวิเคราะห์สัญญาณขนาดเล็กของ BJT (BJT Small-Signal Analysis Lab: re Model & h-Parameter)

แอปพลิเคชันเว็บเพื่อการเรียนรู้และจำลองการวิเคราะห์สัญญาณขนาดเล็กสำหรับ **BJT (re Model & h-Parameter Model)**

## การเริ่มต้นใช้งาน (Getting Started)

```bash
cd d:\ELEC_WEB_APP\bjt_small_signal_app
node server.js
# เปิดเบราว์เซอร์: http://localhost:3006/
```

## โมดูลหลัก 5 โมดูล

1. **โมเดล re ของ BJT:** ค่าความต้านทานไดนามิก re = 26mV / IE, อุณหภูมิ, วงจรสมมูล AC Model
2. **โมเดลไฮบริดพารามิเตอร์ (h-Parameter):** Two-Port Network, hie, hfe, hre, hoe, และการแปลงค่าระหว่าง re <-> h-param
3. **การวิเคราะห์วงจรขยาย 4 โครงแบบ:** CE Bypassed, CE Unbypassed, CC Follower, CB RF Amp
4. **ห้องทดลองเสมือนจริง & ออสซิลโลสโคป:** เปรียบเทียบผลลัพธ์ระหว่าง re Model กับ h-Parameter Model, สัญญาณ Dual-Trace
5. **แบบทดสอบความรู้ 12 ข้อ & Google Sheets:** ควิซเก็บคะแนน, Export CSV, บันทึกคะแนนลง Google Sheets

## Port

แอปนี้รันบน Port **3006**