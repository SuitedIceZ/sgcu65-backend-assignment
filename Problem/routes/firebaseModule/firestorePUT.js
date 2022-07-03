
const dbGET = require("./firestoreGET");
const dbHandler = require("./firestoreGET");

module.exports = async function (req,db,router,callback) {
    var destID = "";
    
    var collection = router;
    if(router == "Assign")collection = "Users";

    const key = req.params.key; //key is name-surname or id , name or id
    if(router == "Users" || router == "Tasks" || router == "Assign"){
        if(!isValidReqBody(req,router)){
            setTimeout( () => callback("400 invalid request body",null) , 10);
            return false;
        }
        if(router != "Assign"){
            req.body.Users = null;
            req.body.Tasks = null;
        }
        
        const snapshot = await db.collection(collection).get();
        var found = false;
        console.log(`Reached snapshot.forEach((doc) by router : ${router} , and key : ${key}`);
        await snapshot.forEach((doc) => {
            if(router == "Users" || router == "Assign"){
                console.log("Compare "+doc.id+ "and "+key);
                if((doc.data().firstname + " " + doc.data().surname) == key || doc.id == key){
                    found = true;
                    destID = doc.id;
                }
            }
            else if(router == "Tasks"){
                if(doc.data().name == key || doc.id == key){
                    found = true;
                    destID = doc.id;
                }
            }
        });
        if(!found){
            callback("403 document not found",null)
        }
        else{
            if(router == "Assign"){
                const docRef = db.collection(collection).doc(destID);
                const doc = await docRef.get();
                const check = await tasksExist(req.body.Tasks,db,"Tasks");
                const combinedTasks = unionArray(doc.data().Tasks,req.body.Tasks);
                if(check){
                    req.body.Tasks = combinedTasks;
                    await updateAllTasks(req,combinedTasks,db);
                }
                else{
                    callback("403 Some tasks not exist",null);
                    return false;
                }
            }

            await update(req,db,router,destID);
            req.params.key = undefined;
            await outputGET(req,db,collection,callback);
        }
    }
    else{
        callback("403 Invalid router",null)
    }

}

async function update(req,db,router,destID){
    var collection = router;
    if(router == "Assign")collection = "Users";

    const docRef = db.collection(collection).doc(destID);
    const doc = await docRef.get();

    if(router == "Users"){
        await docRef.set({
            firstname: req.body.firstname,
            surname: req.body.surname,
            role: req.body.role,
            email: req.body.email,
            Tasks: null
        });
    }
    else if(router == "Tasks"){
        await docRef.set({
            name: req.body.name,
            content: req.body.content,
            status: req.body.status,
            deadline: req.body.deadline,
            Users: req.body.Users
        });
    }
    else if(router == "Assign"){
        console.log(`Test router assign in update : ${doc.data().firstname} , ${doc.data().surname} , ${doc.data().role} , ${doc.data().email} , ${req.body.Tasks}`)

        await docRef.set({
            firstname: doc.data().firstname,
            surname: doc.data().surname,
            role: doc.data().role,
            email: doc.data().email,
            Tasks: req.body.Tasks
        });
    }
}

async function outputGET(req,db,collection,callback){
    await dbGET(req,db,collection,(err,output) => {
        if(err){ setTimeout( () => callback(err,null) , 1000); }
        else{
            setTimeout( () => 
            callback(null,
            {
                data: () => (output.data())
            }) , 
            1000);
        }
    })
}

function isValidReqBody(req,router){
    if(router == "Users"){
        if(req.body.firstname == undefined || req.body.surname == undefined || req.body.role == undefined || req.body.email == undefined){
            return false;
        }
        return true;
    }
    else if(router == "Tasks"){
        if(req.body.name == undefined || req.body.content == undefined || req.body.status == undefined || req.body.deadline == undefined){
            return false;
        }
        return true;
    }
    else if(router == "Assign"){
        if(req.body.Tasks == undefined){
            return false;
        }
        return true;
    }
}

function unionArray(arrayA,arrayB){
    var unionSet = new Set();

    if(arrayA != null){
        for(var i = 0 ; i < arrayA.length ; i ++){
            unionSet.add(arrayA[i]);
        }
    }
    if(arrayB != null){
        for(var i = 0 ; i < arrayB.length ; i ++){
            unionSet.add(arrayB[i]);
        }
    }
    
    var outputArray = [];
    var cnt = 0;
    for(let item of unionSet){
        outputArray[cnt++] = item;
    }
    return outputArray;
}

async function tasksExist(combinedTasks,db,collection){
    
    var combinedTasksSet = new Set();
    for(var i = 0 ; i < combinedTasks.length ; i ++){
        console.log("Check task element : "+combinedTasks[i]);
        combinedTasksSet.add(combinedTasks[i]);
    }

    //delete each tasks in database until empty to check
    const snapshot = await db.collection(collection).get();
    await snapshot.forEach((doc) => {
        console.log("In tasksExist , compare : "+doc.data().name);
        if(combinedTasksSet.has(doc.data().name)){
            combinedTasksSet.delete(doc.data().name);
        }
    });
    console.log("combinedTasksSet.size : "+combinedTasksSet.size);
    return combinedTasksSet.size == 0;
}

async function updateAllTasks(req,combinedTasks,db){

    var Fullname = null;
    var snapshot = await db.collection("Users").get();
    await snapshot.forEach((doc) => {
        if(req.params.key == doc.id || req.params.key == doc.data().firstname+" "+doc.data().surname){
            Fullname = doc.data().firstname+" "+doc.data().surname;
            console.log(`Fullname = ${Fullname} , key = ${req.params.key} , doc.id = ${doc.id}`);
        }
    });
    
    var combinedTasksSet = new Set();
    for(var i = 0 ; i < combinedTasks.length ; i ++){
        combinedTasksSet.add(combinedTasks[i]);
    }

    snapshot = await db.collection("Tasks").get();
    var arrayTasksID = [];
    var cnt = 0;
    await snapshot.forEach((doc) => {
        if(combinedTasksSet.has(doc.data().name)){
            arrayTasksID[cnt++] = doc.id;
        }
    })
    for(let docID of arrayTasksID){
        const docRef = await db.collection("Tasks").doc(docID);
        const doc = await docRef.get();
        console.log(`In last loop : id ${doc.id} , name ${doc.data().name}`);
        if(combinedTasksSet.has(doc.data().name)){
            req.body.name = doc.data().name;
            req.body.content = doc.data().content;
            req.body.status = doc.data().status;
            req.body.deadline = doc.data().deadline;
            req.body.Users = unionArray([Fullname],doc.data().Users);
            console.log("Before update tasks by assign : ");
            await update(req,db,"Tasks",doc.id);
        }
    }
}