
module.exports = async function (req,db,collection,callback) {
    const key = req.params.key;
    if(collection == "Users" || collection == "Tasks"){

        var output = "{\"message\":\"OK\",";
        if(req.method == "POST")output = "{\"message\":\"Created\","
        output += "\"collection\":\"" + collection + "\",";
        output += "\"query-key\":\"" + key + "\",";
        
        output += "\"data\": [";
        
        const snapshot = await db.collection(collection).get();
        var cnt = 0

        snapshot.forEach((doc) => {
            if(collection == "Users"){
                if(key == undefined || doc.data().firstname + " " + doc.data().surname == key || doc.data().role == key || doc.id == key){
                    cnt++;
                    output += parseDocument(collection,doc);
                }
            }
            if(collection == "Tasks"){
                //console.log("Called by key : " + key);
                if(key == undefined || doc.data().name == key || doc.id == key){
                    cnt++;
                    output += parseDocument(collection,doc);
                }
            }
        });
        output = output.substring(0,output.length-1);
        if(cnt == 0) output += "null";
        else output += "]";
        output += "}";

        setTimeout( () => 
        callback(null,
        {
            data: () => (output)
        }) , 
        100);
    }
    else{
        setTimeout( () => callback("403 Invalid collection",null) , 10);
    }

}

function parseDocument(collection,doc)
{
    const docData = doc.data() ;
    var ret = "";
    if(collection == "Users"){
        ret += `{\"firstname\": \"${docData.firstname}\",`;
        ret += `\"surname\": \"${docData.surname}\",`;
        ret += `\"email\": \"${docData.email}\",`;
        ret += `\"role\": \"${docData.role}\",`;
        ret += `\"id\": \"${doc.id}\",`;

        ret += `\"Tasks\": [`;
        if(docData.Tasks != null){
            for(var i = 0 ; i < docData.Tasks.length ; i++){
                ret += `\"${docData.Tasks[i]}\"`
                if(i != docData.Tasks.length - 1)ret += ",";
            }
        }
        ret += "]},";
        return ret;
    }
    else if(collection == "Tasks"){
        ret += `{\"name\": \"${docData.name}\",`;
        ret += `\"content\": \"${docData.content}\",`;
        ret += `\"status\": \"${docData.status}\",`;
        ret += `\"deadline\": \"${docData.deadline}\",`;
        ret += `\"id\": \"${doc.id}\",`;
        
        ret += `\"Users\": [`;
        if(docData.Users != null){
            for(var i = 0 ; i < docData.Users.length ; i++){
                ret += `\"${docData.Users[i]}\"`
                if(i != docData.Users.length - 1)ret += ",";
            }
        }
        ret += "]},";
        return ret;
    }
    else{
        return "ERROR not found "+collection;
    }

}