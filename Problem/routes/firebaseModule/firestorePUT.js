
const dbGET = require("./firestoreGET");


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
            setTimeout( () => callback("403 document not found",null) , 10); 
        }
        else{
            await update(req,db,router,destID);
            req.params.key = undefined;
            await outputGET(req,db,collection,callback);
        }
    }
    else{
        setTimeout( () => callback("403 Invalid router",null) , 10);
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
            Users: null
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