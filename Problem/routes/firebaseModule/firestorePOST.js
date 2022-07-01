
const dbGET = require("./firestoreGET");

module.exports = async function (req,db,collection,callback) {
    const key = req.params.key;
    if(collection == "Users" || collection == "Tasks"){
        if(collection == "Users")
            req.body.Tasks = null;
        else
            req.body.Users = null;

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
    else{
        setTimeout( () => callback("Invalid collection",null) , 10);
    }

}