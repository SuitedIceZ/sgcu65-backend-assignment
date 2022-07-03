# SGCU65 backend assignment

โดย นาย ณัฐนภนต์ บำรุงศรี

Stack ที่ใช้ : Node.js, Express

Database ที่ใช้ : Cloud Firestore

# Contents

- [Installation](#installation)
- [Starting](#starting)
- [Usage](#usage)
- [Additional](#additional)
- [Assumption](#assumption)


# Installation 

(คาดว่าเป็น package ที่ work บน windows os)

1. เปิด Terminal ที่ folder Problem

2. ใช้คำสั่ง
    ```
    npm install package-lock.json
    ```

# Starting

1. เปิด Terminal ที่ folder Problem

2. ใช้คำสั่ง
    ```
    npm start
    ```

3. Server จะรันที่ [localhost:3000/](localhost:3000/)

# Usage
- [User](#user)
- [Task](#task)
- [Assign](#assign)

## User

1. สามารถเพิ่มพนักงานใหม่เข้าไปในระบบได้(Create)
    
    โดยใช้ POST Request ไปที่
    ```
    localhost:3000/Users
    ```
    ด้วย body JSON ที่ระบุข้อมูลของ User เช่น
    ```json
    {
        "email": "6332014621@student.chula.ac.th",
        "firstname": "Natnaphon",
        "surname": "Bumrungsri",
        "role": "Student"
    }
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database หลังจากเพิ่มข้อมูลแล้ว เช่น
    ```json
    {
        "message": "Created",
        "collection": "Users",
        "query-key": "undefined",
        "data": [
            {
                "firstname": "Natnaphon",
                "surname": "Bumrungsri",
                "email": "6332014621@student.chula.ac.th",
                "role": "Student",
                "id": "AtRi7wzXF0AVaW33AMRr",
                "Tasks": []
            }
        ]
    }
    ```

2. สามารถดูข้อมูลของพนักงานทุกคนได้ (Read)

    โดยใช้ GET Request ไปที่
    ```
    localhost:3000/Users
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database เช่น
    ```json
    {
        "message": "OK",
        "collection": "Users",
        "query-key": "undefined",
        "data": [
            {
                "firstname": "Natnaphon",
                "surname": "Bumrungsri",
                "email": "6332014621@student.chula.ac.th",
                "role": "Student",
                "id": "AtRi7wzXF0AVaW33AMRr",
                "Tasks": []
            },
            {
                "firstname": "White",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "08Q0anw12t7jJZkYofLU",
                "Tasks": []
            }
        ]
    }
    ```

3. สามารถแก้ไขข้อมูลของพนักงานได้ เช่นชื่อ-สกุล ตำแหน่ง (Update)

    โดยใช้ PUT Request ไปที่
    ```
    localhost:3000/Users/:key
    ```
    โดยที่ {key} คือ {ชื่อ นามสกุล} หรือ {id} ของ Users คนที่ต้องการ update

    ด้วย body JSON ที่ระบุข้อมูลใหม่ของ User เช่น
    ```
    localhost:3000/Users/Natnaphon Bumrungsri
    ```
    ```json
    {
        "email": "6332014621@student.chula.ac.th",
        "firstname": "Natnaphon",
        "surname": "Bumrungsri",
        "role": "Backend Developer"
    }
    ```

    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database หลังจากแก้ไขข้อมูลแล้ว เช่น
    ```json
    {
        "message": "OK",
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
            },
            {
                "firstname": "White",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "08Q0anw12t7jJZkYofLU",
                "Tasks": []
            }
        ]
    }
    ```

4. สามารถลบข้อมูลพนักงานในระบบได้ (Delete)

    โดยใช้ DELETE Request ไปที่
    ```
    localhost:3000/Users/:key
    ```
    โดยที่ {key} คือ {ชื่อ นามสกุล} หรือ {id} ของ Users คนที่ต้องการ Delete เช่น
    ```
    localhost:3000/Users/VDLkKwqYOIJ5Coiu60zK
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database หลังจากลบข้อมูลแล้ว เช่น
    
    ```json
    {
        "message": "OK",
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

5. สามารถค้นหาพนักงานโดยใช้ ชื่อ นามสกุล หรือ ตำแหน่งได้

    โดยใช้ GET Request ไปที่
    ```
    localhost:3000/Users/:key
    ```
    โดยที่ {key} คือ {ชื่อ นามสกุล} หรือ {id} หรือ {role} ของ Users คนที่ต้องการ Search เช่น
    ```
    localhost:3000/Users/cat
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database หลังจากค้นหาข้อมูลแล้ว เช่น
    
    ```json
    {
        "message": "OK",
        "collection": "Users",
        "query-key": "cat",
        "data": [
            {
                "firstname": "White",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "08Q0anw12t7jJZkYofLU",
                "Tasks": []
            },
            {
                "firstname": "Black",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "sTvPXc38gbDYiyEQcDGb",
                "Tasks": []
            }
        ]
    }
    ```
## Task

1. สามารถสร้าง Task ใหม่ได้ (Create)

    โดยใช้ POST Request ไปที่

    ```
    localhost:3000/Tasks
    ```
    ด้วย body JSON ที่ระบุข้อมูลของ Task เช่น
    ```json
    {
        "name": "SGCU65-Backend-Assignment",
        "content": "api service and database",
        "status": "will finish",
        "deadline": "04/07/2565"
    }
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Tasks ทั้งหมดใน database หลังจากเพิ่มข้อมูลแล้ว เช่น
    ```json
    {
        "message": "Created",
        "collection": "Tasks",
        "query-key": "undefined",
        "data": [
            {
                "name": "SGCU65-Backend-Assignment",
                "content": "api service and database",
                "status": "will finish",
                "deadline": "04/07/2565",
                "id": "j8FUDbJOSp9MAJyQPUvS",
                "Users": []
            }
        ]
    }
    ```

2. สามารถดูข้อมูลของ Task ทั้งหมดได้ (Read)

    โดยใช้ GET Request ไปที่
    ```
    localhost:3000/Tasks
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Tasks ทั้งหมดใน database เช่น
    ```json
    {
        "message": "OK",
        "collection": "Tasks",
        "query-key": "undefined",
        "data": [
            {
                "name": "play",
                "content": "to enjoy",
                "status": "at free time",
                "deadline": "never end",
                "id": "K4OnLFMt3peueyFtM0Up",
                "Users": []
            },
            {
                "name": "SGCU65-Backend-Assignment",
                "content": "api service and database",
                "status": "will finish",
                "deadline": "04/07/2565",
                "id": "j8FUDbJOSp9MAJyQPUvS",
                "Users": []
            },
            {
                "name": "eat",
                "content": "to fulfill",
                "status": "3 times daily",
                "deadline": "never end",
                "id": "kdQJ8YAAx5NHJZARB0fC",
                "Users": []
            }
        ]
    }
    ```

3. สามารถแก้ไข ข้อมูล/status ของ Task ได้ (Update)

    โดยใช้ PUT Request ไปที่
    ```
    localhost:3000/Tasks/:key
    ```
    โดยที่ {key} คือ {ชื่อ} หรือ {id} ของ Tasks ที่ต้องการ update

    ด้วย body JSON ที่ระบุข้อมูลใหม่ของ Task เช่น
    ```
    localhost:3000/Tasks/SGCU65-Backend-Assignment
    ```
    ```json
    {
        "name": "SGCU65-Backend-Assignment",
        "content": "api service and database",
        "status": "finish",
        "deadline": "04/07/2565"
    }
    ```

    จะได้ Respond ที่มี body JSON แสดงข้อมูล Tasks ทั้งหมดใน database หลังจากแก้ไขข้อมูลแล้ว เช่น
    ```json
    {
        "message": "OK",
        "collection": "Tasks",
        "query-key": "undefined",
        "data": [
            {
                "name": "play",
                "content": "to enjoy",
                "status": "at free time",
                "deadline": "never end",
                "id": "K4OnLFMt3peueyFtM0Up",
                "Users": []
            },
            {
                "name": "SGCU65-Backend-Assignment",
                "content": "api service and database",
                "status": "finished",
                "deadline": "04/07/2565",
                "id": "YMeoXnwTjlkEPRDG58ET",
                "Users": []
            },
            {
                "name": "eat",
                "content": "to fulfill",
                "status": "3 times daily",
                "deadline": "never end",
                "id": "kdQJ8YAAx5NHJZARB0fC",
                "Users": []
            }
        ]
    }
    ```

4. สามารถลบ Task ได้ (Delete)

    โดยใช้ PUT Request ไปที่
    ```
    localhost:3000/Tasks/:key
    ```
    โดยที่ {key} คือ {ชื่อ} หรือ {id} ของ Tasks ที่ต้องการ delete เช่น
    ```
    localhost:3000/Tasks/K4OnLFMt3peueyFtM0Up
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Tasks ทั้งหมดใน database หลังจากลบข้อมูลแล้ว เช่น
    ```json
    {
        "message": "OK",
        "collection": "Tasks",
        "query-key": "undefined",
        "data": [
            {
                "name": "SGCU65-Backend-Assignment",
                "content": "api service and database",
                "status": "finished",
                "deadline": "04/07/2565",
                "id": "YMeoXnwTjlkEPRDG58ET",
                "Users": []
            },
            {
                "name": "eat",
                "content": "to fulfill",
                "status": "3 times daily",
                "deadline": "never end",
                "id": "kdQJ8YAAx5NHJZARB0fC",
                "Users": []
            }
        ]
    }
    ```

5. สามารถค้นหา Task ด้วย name หรือ id ได้

    โดยใช้ GET Request ไปที่
    ```
    localhost:3000/Tasks/:key
    ```
    โดยที่ {key} คือ {ชื่อ} หรือ {id} ของ Tasks ที่ต้องการ search เช่น

    ```
    localhost:3000/Tasks/SGCU65-Backend-Assignment
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Tasks ทั้งหมดใน database หลังจากค้นหาข้อมูลแล้ว เช่น
    
    ```json
    {
        "message": "OK",
        "collection": "Tasks",
        "query-key": "SGCU65-Backend-Assignment",
        "data": [
            {
                "name": "SGCU65-Backend-Assignment",
                "content": "api service and database",
                "status": "finished",
                "deadline": "04/07/2565",
                "id": "YMeoXnwTjlkEPRDG58ET",
                "Users": []
            }
        ]
    }
    ```

## Assign

1. สามารถ assign งานให้ user ได้ โดยที่ user 1 คนสามารถรับได้หลายอันและ task 1 อันสามารถมีผู้รับผิดชอบได้หลายคน

    โดยใช้ PUT Request ไปที่
    ```
    localhost:3000/Assign/:key
    ```
    โดยที่ {key} คือ {ชื่อ นามสกุล} หรือ {id} ของ Users คนที่ต้องการ assign task ต่างๆ

    ด้วย body JSON ที่ระบุ task ต่างๆ ที่จะ assign ให้ User เช่น
    ```
    localhost:3000/Users/Natnaphon Bumrungsri
    ```
    ```json
    {
        "Tasks": ["SGCU65-Backend-Assignment","eat"]
    }
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database หลังจาก assign แล้ว เช่น
    
    ```json
    {
        "message": "OK",
        "collection": "Users",
        "query-key": "undefined",
        "data": [
            {
                "firstname": "White",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "08Q0anw12t7jJZkYofLU",
                "Tasks": []
            },
            {
                "firstname": "Natnaphon",
                "surname": "Bumrungsri",
                "email": "6332014621@student.chula.ac.th",
                "role": "Backend Developer",
                "id": "A8Rx62R20Jif1HczYa64",
                "Tasks": [
                    "SGCU65-Backend-Assignment",
                    "eat"
                ]
            },
            {
                "firstname": "Black",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "sTvPXc38gbDYiyEQcDGb",
                "Tasks": []
            }
        ]
    }
    ```
    โดย user 1 คนสามารถรับได้หลายอันและ task 1 อันสามารถมีผู้รับผิดชอบได้หลายคน เช่น เมื่อส่ง PUT Request ไปที่
    ```
    localhost:3000/Users/White the cat
    ```
    ด้วย body json
    ```json
    {
        "Tasks": ["play","eat"]
    }
    ```
    จะได้ Respond ที่มี body JSON แสดงข้อมูล Users ทั้งหมดใน database หลังจาก assign แล้ว ดังนี้
    ```json
    {
        "message": "OK",
        "collection": "Users",
        "query-key": "undefined",
        "data": [
            {
                "firstname": "White",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "08Q0anw12t7jJZkYofLU",
                "Tasks": [
                    "play",
                    "eat"
                ]
            },
            {
                "firstname": "Natnaphon",
                "surname": "Bumrungsri",
                "email": "6332014621@student.chula.ac.th",
                "role": "Backend Developer",
                "id": "A8Rx62R20Jif1HczYa64",
                "Tasks": [
                    "SGCU65-Backend-Assignment",
                    "eat"
                ]
            },
            {
                "firstname": "Black",
                "surname": "the cat",
                "email": "none",
                "role": "cat",
                "id": "sTvPXc38gbDYiyEQcDGb",
                "Tasks": []
            }
        ]
    }
    ```
    โดยจะเก็บข้อมูลใน collection Tasks ว่าแต่ละ task มี user ใดรับผิดชอบบ้าง ดังนี้
    GET Request
    ```
    localhost:3000/Tasks/
    ```
    จะได้ว่า
    ```json
    {
        "message": "OK",
        "collection": "Tasks",
        "query-key": "undefined",
        "data": [
            {
                "name": "eat",
                "content": "to fulfill",
                "status": "3 times daily",
                "deadline": "never end",
                "id": "OUJhD5OvQLyIy9d78yt5",
                "Users": [
                    "White the cat",
                    "Natnaphon Bumrungsri"
                ]
            },
            {
                "name": "play",
                "content": "to enjoy",
                "status": "at free time",
                "deadline": "never end",
                "id": "Y38PbDJo0objneO0CvDi",
                "Users": [
                    "White the cat"
                ]
            },
            {
                "name": "SGCU65-Backend-Assignment",
                "content": "api service and database",
                "status": "will finish",
                "deadline": "04/07/2565",
                "id": "eXem1JZBzWUWAgDGzT5S",
                "Users": [
                    "Natnaphon Bumrungsri"
                ]
            }
        ]
    }
    ```






# Additional
1. เพิ่ม field Tasks ในแต่ละ user เก็บ array ของ task ทั้งหมดที่ user นั้นๆรับผิดชอบ
    
2. เพิ่ม field Users ในแต่ละ task เก็บ array ของ user ทั้งหมดที่รับผิดชอบ task นั้นๆ

# Assumption 
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





