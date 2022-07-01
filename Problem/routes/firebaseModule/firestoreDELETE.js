
const dbGET = require("./firestoreGET");

var destID = "";

module.exports = async function (req,db,collection,callback) {
    const key = req.params.key; //key is name-surname or id , name or id
    if(collection == "Users" || collection == "Tasks"){
        const snapshot = await db.collection(collection).get();
        var found = false;
        await snapshot.forEach((doc) => {
            if(collection == "Users"){
                if(req.body.deleteAllFlag){
                    destID = doc.id;
                    del(req,db,collection);
                }
                else if((doc.data().firstname + " " + doc.data().surname) == key || doc.id == key){
                    found = true;
                    destID = doc.id;
                }
            }
            else if(collection == "Tasks"){
                if(req.body.deleteAllFlag){
                    destID = doc.id;
                    del(req,db,collection);
                }
                else if(doc.data().name == key || doc.id == key){
                    found = true;
                    destID = doc.id;
                }
            }
        });
        
        if(found || req.body.deleteAllFlag){
            await del(req,db,collection);
            req.params.key = undefined;
            await outputGET(req,db,collection,callback);
        }
        else{
            setTimeout( () => callback("403 document not found",null) , 10); 
        }
    }
    else{
        setTimeout( () => callback("403 Invalid collection",null) , 10);
    }

}

async function del(req,db,collection){
    await db.collection(collection).doc(destID).delete();
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