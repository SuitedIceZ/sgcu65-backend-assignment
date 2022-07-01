//npm node module
const express = require('express');
const bodyParser = require('body-parser');

//file node module
const dbHandler = require("./../firebaseModule/firestoreHandler");

//create TaskRouter as express router
const TaskRouter = express.Router();

//use npm node module
TaskRouter.use(bodyParser.json());

//configulation
const collection = "Tasks"; // collection name

var output = "";
//route for all Tasks
TaskRouter.route('/')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');

        if(req.method == "PUT")next();
        if(req.method == "DELETE")req.body.deleteAllFlag = true;

        dbHandler(req,collection,(err,outputCallback) =>{
            if(err){ //Error handler
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
        res.end(output);
    });

//route with key parameter
TaskRouter.route('/:key')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');

        if(req.method == "POST")next();
        if(req.method == "DELETE")req.body.deleteAllFlag = false;

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
        res.end(output);
    });


module.exports = TaskRouter;