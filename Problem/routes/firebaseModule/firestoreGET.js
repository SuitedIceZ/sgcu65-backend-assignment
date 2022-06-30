// Import the firebase module
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// Initialize Firebase
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

module.exports = async function (collection,callback) {
    //for read all document

    console.log("Called GET funtion with "+ collection);//+ input);

    //const res = await db.collection('users').doc('aturing').delete();
    if(collection == "Users" || collection == "Tasks"){
        var output = "{\"collection\":\"" + collection + "\",";
        const snapshot = await db.collection(collection).get();
            snapshot.forEach((doc) => {
            console.log(doc.id, doc.data().firstname, ' =>', doc.data());

            output += parseDocument(collection,doc.data())
        });
        output = output.substring(0,output.length-1);
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
        ret += `{\"firstname\": \"${docData.firstname}\",`;
        ret += `\"surname\": \"${docData.surname}\",`;
        ret += `\"email\": \"${docData.email}\",`;
        ret += `\"role\": \"${docData.role}\",`;
    
        ret += `\"Tasks\": `;
        for(var i = 0 ; i < docData.Tasks.length ; i++){
            ret += `\[\"${docData.Tasks[i]}\"\]`
            if(i != docData.Tasks.length - 1)ret += ",";
        }
        ret += "},";
        return ret;
    }
    else{
        return "ERROR";
    }

}