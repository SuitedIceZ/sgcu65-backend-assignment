
const dbGET = require("./firestoreGET");

module.exports = async function (req,db,collection,callback) {
    if(collection == "Users" || collection == "Tasks"){
        if(!isValidReqBody(req,collection)){
            setTimeout( () => callback("400 invalid request body",null) , 10);
            return false;
        }
        if(collection == "Users")
            req.body.Tasks = null;
        else
            req.body.Users = null;

        const snapshot = await db.collection(collection).get();
        var duplicated = false;
        await snapshot.forEach((doc) => {
            if(collection == "Users"){
                if(doc.data().firstname == req.body.firstname && doc.data().surname == req.body.surname){
                    duplicated = true;
                    setTimeout( () => callback("403 exist key value",null) , 10); //duplicate key value
                    return false;
                }
            }
            else if(collection == "Tasks"){
                if(doc.data().name == req.body.name){
                    duplicated = true;
                    setTimeout( () => callback("403 exist key value",null) , 10); //duplicate key value
                    return false;
                }
            }
        });
        if(!duplicated){
            await create(req,db,collection);
            await outputGET(req,db,collection,callback);
        }
    }
    else{
        setTimeout( () => callback("403 Invalid collection",null) , 10);
    }

}

async function create(req,db,collection){
    await db.collection(collection).add(req.body);
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