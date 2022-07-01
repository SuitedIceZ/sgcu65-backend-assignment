// Import the firebase module
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// Import file node module
const dbGET = require("./firestoreGET");

// Initialize Firebase
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

module.exports = async function (method,collection,key,callback) {
    //const res = await db.collection('users').doc('aturing').delete();

    if(method == "GET"){
        await dbGET(db,collection,key,(err,output) => {
            if(err){ setTimeout( () => callback(err,null) , 100); }
            else{
                setTimeout( () => 
                callback(null,
                {
                    data: () => (output.data())
                }) , 
                100);
            }
        })
    }
    else{
        setTimeout( () => callback("Invalid method",null) , 10);
    }
}