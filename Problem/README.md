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

# Addtional Idea : 
1. เพิ่ม field Tasks ในแต่ละ user เก็บ array ของ task ทั้งหมดที่ user นั้นๆรับผิดชอบ
    
2. เพิ่ม field Users ในแต่ละ task เก็บ array ของ user ทั้งหมดที่รับผิดชอบ task นั้นๆ

# Assumption : 
1. ชื่อ-นามสกุลแต่ละ Users สามารถมีหลายชุดข้อมูลซ้ำกันได้ (id ไม่ซ้ำ)

2. ชื่อแต่ละ Tasks สามารถมีหลายชุดข้อมูลซ้ำกันได้ แต่ id ไม่ซ้ำ





