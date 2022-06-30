# SGCU65 backend assignment

โดย นาย ณัฐนภนต์ บำรุงศรี

Stack ที่ใช้ : Node.js, Express
Database ที่ใช้ : Cloud Firestore

# Installation **(not finished yet)**

1. เปิด Terminal ที่ folder Problem

2. ใช้คำสั่ง
    ```
    npm install package-lock.json
    ```

3. **not finished yet**

# Starting Server :

1. เปิด Terminal ที่ folder Problem

2. ใช้คำสั่ง
    ```
    npm start
    ```

3. Server จะรันที่ [localhost:3000/](localhost:3000/)

# Usage

## โจทย์ข้อที่ 1 : **User**

1. สามารถเพิ่มพนักงานใหม่เข้าไปในระบบได้(Create)
    
    โดยใช้ Api POST Request ไปที่
    ```
    localhost:3000/Users
    ```
    ด้วย body JSON ที่ระบุข้อมูลของ User เช่น
    ```js
    {
        "email": "6332014621@student.chula.ac.th",
        "firstname": "Natnaphon",
        "lastname": "Bumrungsri",
        "role": "Backend Developer"
    }
    ```
2. To be continue ...


