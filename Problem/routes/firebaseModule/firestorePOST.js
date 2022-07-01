
const dbGET = require("./firestoreGET");

module.exports = async function (req,db,collection,callback) {
    if(collection == "Users" || collection == "Tasks"){
        if(collection == "Users")
            req.body.Tasks = null;
        else
            req.body.Users = null;

        const snapshot = await db.collection(collection).get();
        var duplicated = false;
        await snapshot.forEach((doc) => {
            if(collection == "Users"){
                if(doc.data().firstname == req.body.firstname && doc.data().lastname == req.body.lastname){
                    duplicated = true;
                    setTimeout( () => callback("403 Forbidden",null) , 10); //duplicate key value
                }
            }
            else if(collection == "Tasks"){
                if(doc.data().name == req.body.name){
                    duplicated = true;
                    setTimeout( () => callback("403 Forbidden",null) , 10); //duplicate key value
                }
            }
        });
        if(!duplicated){
            outputGET(req,db,collection,callback);
        }
    }
    else{
        setTimeout( () => callback("Invalid collection",null) , 10);
    }

}

async function outputGET(req,db,collection,callback){
    const res = await db.collection(collection).add(req.body);

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