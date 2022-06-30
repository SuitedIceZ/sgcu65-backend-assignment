//npm node module
const express = require('express');
const bodyParser = require('body-parser');

//file node module
const dbGET = require("../firebaseModule/firestore");
//const dbQuery = require("./../firebaseModule/firestoreQuery");

//create UserRouter as express router
const UserRouter = express.Router();

//use npm node module
UserRouter.use(bodyParser.json());

//Respond keyword
const keywordSigular = "User"; // replace User by ' + keywordSigular + ' // for extensible to another router
const keywordPlural = "Users"; // replace Users by ' + keywordPlural + ' // for extensible to another router

//route for all Users
UserRouter.route('/')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        next(); //continue to the next specific request
    })
    .get((req,res,next) => { //execute after .all(...) by next(); include parameter 
        //res.end('Will send all the ' + keywordPlural + ' to you!');
        dbGET("Users","",(err,output) =>{
            if(err){
                res.statusCode = 500;
                console.log("ERROR : ", err.message);
                res.end("ERROR : ", err.message);
            }
            else{
                console.log('Test new module : ' + output.data() + ' to you!');
                res.end(output.data());
            }
        }) 
        
    })
    .post((req,res,next) => { //use http POST REST request
        res.end('Will add the ' + keywordSigular + ': ' + req.body);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.statusCode = 403;
        res.end('PUT operation not supported on /' + keywordPlural + '');
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end('Deleting all the ' + keywordPlural + '!');
    });


//route with key parameter
UserRouter.route('/:key')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        next(); //continue to the next specific request
    })
    .get((req,res,next) => { //execute after .all(...) by next(); include parameter 
        dbGET("Users",req.params.key,(err,output) =>{
            if(err){
                res.statusCode = 500;
                console.log("ERROR : ", err.message);
                res.end("ERROR : ", err.message);
            }
            else{
                console.log('Test new module : ' + output.data() + ' to you!');
                res.end(output.data());
            }
        })
    })
    .post((req,res,next) => { //use http POST REST request
        res.statusCode = 403;
        res.end('POST operation not supported on /' + keywordPlural + '/'
            + req.params.key);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.write('Updating the ' + keywordSigular + ': ' + req.params.key + '\n');
        res.end('Will update the ' + keywordSigular + ': ' + req.body.name + 
            ' with detail: ' + req.body.description);
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end('Deleting the ' + keywordSigular + ': '+ req.params.key );
    });


module.exports = UserRouter;