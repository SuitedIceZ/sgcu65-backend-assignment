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
        const snapshot = await db.collection('Users').get();
            snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
        const output = "/{\"name\": \"ice\"}";
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