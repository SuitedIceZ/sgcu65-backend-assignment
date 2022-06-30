// Import the firebase module
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// Initialize Firebase
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

module.exports = async function (collection,key,callback) {
    //for read all document

    console.log("Called GET funtion with "+ collection);//+ input);

    //const res = await db.collection('users').doc('aturing').delete();
    if(collection == "Users" || collection == "Tasks"){

        var output = "{\"message\":\"OK\",";
        output += "\"collection\":\"" + collection + "\",";
        output += "\"key\":\"" + key + "\",";
        
        output += "\"data\": ";
        
        const snapshot = await db.collection(collection).get();
        var cnt = 0

        snapshot.forEach((doc) => {
            if(collection == "Users"){
                if(key == "" || doc.data().firstname + " " + doc.data().surname == key || doc.data().email == key){
                    console.log(doc.id, doc.data().firstname, ' =>', doc.data());
                    cnt++;
                    output += parseDocument(collection,doc.data());
                }
            }
            if(collection == "Tasks"){
                //console.log("Called by key : " + key);
                if(key == "" || doc.data().name == key || doc.id == key){
                    console.log(doc.id, doc.data().firstname, ' =>', doc.data());
                    cnt++;
                    output += parseDocument(collection,doc.data());
                }
            }
        });
        output = output.substring(0,output.length-1);
        if(cnt == 0) output += "null"; 
        output += "}";

        setTimeout( () => 
            callback(null,
            {
                data: () => (output)
            }) , 
            100);
        
    }
    else{
        setTimeout( () => 
            callback(new Error("Not found collection : " + collection),
            null) , 
            100);
    }
}

function parseDocument(collection,docData)
{

    var ret = "";
    if(collection == "Users"){
        ret += `[\"firstname\": \"${docData.firstname}\",`;
        ret += `\"surname\": \"${docData.surname}\",`;
        ret += `\"email\": \"${docData.email}\",`;
        ret += `\"role\": \"${docData.role}\",`;
    
        ret += `\"Tasks\": `;
        for(var i = 0 ; i < docData.Tasks.length ; i++){
            ret += `\[\"${docData.Tasks[i]}\"\]`
            if(i != docData.Tasks.length - 1)ret += ",";
        }
        ret += "],";
        return ret;
    }
    else if(collection == "Tasks"){
        ret += `[\"name\": \"${docData.name}\",`;
        ret += `\"content\": \"${docData.content}\",`;
        ret += `\"status\": \"${docData.status}\",`;
        ret += `\"deadline\": \"${docData.deadline}\",`;
    
        ret += `\"Users\": `;
        for(var i = 0 ; i < docData.Users.length ; i++){
            ret += `\[\"${docData.Users[i]}\"\]`
            if(i != docData.Users.length - 1)ret += ",";
        }
        ret += "],";
        return ret;
    }
    else{
        return "ERROR not found "+collection;
    }

}