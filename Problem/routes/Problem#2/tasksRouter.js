//npm node module
const express = require('express');
const bodyParser = require('body-parser');

//file node module
const dbHandler = require("./../firebaseModule/firestoreHandler");
const dbErrorHandler = require("../firebaseModule/firestoreErrorHandler");

//create TaskRouter as express router
const TaskRouter = express.Router();

//use npm node module
TaskRouter.use(bodyParser.json());

//configulation
const routerName = "Tasks"; // routerName name

var output = "";
//route for all Tasks
TaskRouter.route('/')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');

        if(req.method == "PUT")next();
        if(req.method == "DELETE")req.body.deleteAllFlag = true;

        dbHandler(req,routerName,(err,outputCallback) =>{
            if(err){ //Error handler
                dbErrorHandler(err,(respond) => {
                    res.statusCode = respond.statusCodeData();
                    res.end(respond.endData());
                })
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
            "error" : "PUT operation not supported on /${routerName}"
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

        dbHandler(req,routerName,(err,outputCallback) =>{
            if(err){
                dbErrorHandler(err,(respond) => {
                    res.statusCode = respond.statusCodeData();
                    res.end(respond.endData());
                })
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
            "error" : "POST operation not supported on /${routerName}/${req.params.key}"
        }`);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.end(output);
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end(output);
    });


module.exports = TaskRouter;