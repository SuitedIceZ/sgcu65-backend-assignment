// Import the firebase module
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// Import file node module
const dbGET = require("./firestoreGET");
const dbPUT = require("./firestorePUT");
const dbPOST = require("./firestorePOST");
const dbDELETE = require("./firestoreDELETE");


// Initialize Firebase
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

module.exports = async function (req,collection,callback) {
    //const res = await db.collection('users').doc('aturing').delete();

    if(req.method == "GET"){
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
    else if(req.method == "POST"){
        await dbPOST(req,db,collection,(err,output) => {
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
        setTimeout( () => callback("Invalid method",null) , 10);
    }
}