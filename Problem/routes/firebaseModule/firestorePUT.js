
const dbGET = require("./firestoreGET");

var destID = "";

module.exports = async function (req,db,collection,callback) {
    const key = req.params.key; //key is name-surname or id , name or id
    if(collection == "Users" || collection == "Tasks"){
        if(!isValidReqBody(req,collection)){
            setTimeout( () => callback("400 invalid request body",null) , 10);
            return false;
        }
        
        const snapshot = await db.collection(collection).get();
        var found = false;
        await snapshot.forEach((doc) => {
            if(collection == "Users"){
                if((doc.data().firstname + " " + doc.data().surname) == key || doc.id == key){
                    found = true;
                    destID = doc.id;
                }
            }
            else if(collection == "Tasks"){
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
            await update(req,db,collection);
            req.params.key = undefined;
            await outputGET(req,db,collection,callback);
        }
    }
    else{
        setTimeout( () => callback("403 Invalid collection",null) , 10);
    }

}

async function update(req,db,collection){
    if(collection == "Users"){
        await db.collection(collection).doc(destID).set({
            firstname: req.body.firstname,
            surname: req.body.surname,
            role: req.body.role,
            email: req.body.email,
            Tasks: null
        });
    }
    else if(collection == "Tasks"){
        await db.collection(collection).doc(destID).set({
            name: req.body.name,
            content: req.body.content,
            status: req.body.status,
            deadline: req.body.deadline,
            Users: null
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

function isValidReqBody(req,collection){
    if(collection == "Users"){
        if(req.body.firstname == undefined || req.body.surname == undefined || req.body.role == undefined || req.body.email == undefined){
            return false;
        }
        return true;
    }
    else if(collection == "Tasks"){
        if(req.body.name == undefined || req.body.content == undefined || req.body.status == undefined || req.body.deadline == undefined){
            return false;
        }
        return true;
    }
}