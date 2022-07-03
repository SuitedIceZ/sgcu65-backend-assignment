# SGCU65 backend assignment

โดย นาย ณัฐนภนต์ บำรุงศรี

Stack ที่ใช้ : Node.js, Express

Database ที่ใช้ : Cloud Firestore

# Installation (คาดว่าเป็น package ที่ work บน windows os)

1. เปิด Terminal ที่ folder Problem

2. ใช้คำสั่ง
    ```
    npm install package-lock.json
    ```


# Starting Server :

1. เปิด Terminal ที่ folder Problem

2. ใช้คำสั่ง
    ```
    npm start
    ```

3. Server จะรันที่ [localhost:3000/](localhost:3000/)

# Usage

## Service ที่ 1 : **User**

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
        "surname": "Bumrungsri",
        "role": "Backend Developer"
    }
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database
    ```js
    {
        "message": "Created",
        "collection": "Users",
        "query-key": "undefined",
        "data": [
            {
                "firstname": "Natnaphon",
                "surname": "Bumrungsri",
                "email": "6332014621@student.chula.ac.th",
                "role": "Backend Developer",
                "id": "AtRi7wzXF0AVaW33AMRr",
                "Tasks": []
            }
        ]
    }
    ```
2. To be continue ...

# Addtional Idea : 
1. เพิ่ม field Tasks ในแต่ละ user เก็บ array ของ task ทั้งหมดที่ user นั้นๆรับผิดชอบ
    
2. เพิ่ม field Users ในแต่ละ task เก็บ array ของ user ทั้งหมดที่รับผิดชอบ task นั้นๆ

# Assumption : 
1. ชื่อ-นามสกุลแต่ละ User ไม่สามารถซ้ำกันได้ และ id ไม่ซ้ำกัน

2. ชื่อแต่ละ Task ไม่สามารถซ้ำกันได้ และ id ไม่ซ้ำกัน

3. ข้อมูลใน minimum field ของ User และ Task ตอนเพิ่มหรือแก้ไข จะไม่สามารถเป็นค่า 
    ```js
    null
    ``` 
    หรือ 
    ```js 
    undefined
    ``` 
    ได้

4. การ assign จะสามารถ assign task ที่มีอยู่ใน database ให้ user ที่อยู่ใน database เท่านั้น





