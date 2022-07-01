//npm node module
const express = require('express');
const bodyParser = require('body-parser');

//file node module
const dbHandler = require("../firebaseModule/firestoreHandler");

//create UserRouter as express router
const UserRouter = express.Router();

//use npm node module
UserRouter.use(bodyParser.json());

//configulation
const collection = "Users"; // collection name

var output = "";
//route for all Users
UserRouter.route('/')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');

        if(req.method == "PUT")next();

        dbHandler(req,collection,(err,outputCallback) =>{
            if(err){ //Error Handler
                if(parseInt(err.substr(0,3)) == NaN){
                    res.statusCode = 500;
                }
                else if(300 <= parseInt(err.substr(0,3)) && parseInt(err.substr(0,3)) < 500){
                    res.statusCode = parseInt(err.substr(0,3)) ;
                }
                else{
                    res.statusCode = 500;
                }
                console.log(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err.substr(4,err.length-4)}"
                }`);
                res.end(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err.substr(4,err.length-4)}"
                }`, );
            }
            else{
                output = outputCallback.data();
                next(); //continue to the next specific request
            }
        }) 

    })
    .get((req,res,next) => { //execute after .all(...) by next(); include parameter 
        res.end(output);
    })
    .post((req,res,next) => { //use http POST REST request
        res.statusCode = 201;
        res.end(output);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.statusCode = 405;
        res.end(`{
            "statusCode" : ${res.statusCode},
            "error" : "PUT operation not supported on /${collection}"
        }`);
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end('Deleting all the ' + collection + '!');
    });


//route with key parameter
UserRouter.route('/:key')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');

        if(req.method == "POST")next();

        dbHandler(req,collection,(err,outputCallback) =>{
            if(err){
                if(parseInt(err.substr(0,3)) == NaN){
                    res.statusCode = 500;
                }
                else if(300 <= parseInt(err.substr(0,3)) && parseInt(err.substr(0,3)) < 500){
                    res.statusCode = parseInt(err.substr(0,3)) ;
                }
                else{
                    res.statusCode = 500;
                }
                console.log(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err.substr(4,err.length-4)}"
                }`);
                res.end(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err.substr(4,err.length-4)}"
                }`, );
            }
            else{
                output = outputCallback.data();
                next(); //continue to the next specific request
            }
        })
    })
    .get((req,res,next) => { //execute after .all(...) by next(); include parameter 
        res.end(output);
    })
    .post((req,res,next) => { //use http POST REST request
        res.statusCode = 405;
        res.end(`{
            "statusCode" : ${res.statusCode},
            "error" : "POST operation not supported on /${collection}/${req.params.key}"
        }`);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.end(output);
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end('Deleting the ' + collection + ': '+ req.params.key );
    });


module.exports = UserRouter;