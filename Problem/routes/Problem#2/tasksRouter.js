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

        dbHandler(req,collection,(err,outputCallback) =>{
            if(err){ //Error handler
                if(err == "403 Forbidden"){
                    res.statusCode = 403;
                }
                else{
                    res.statusCode = 500;
                }
                console.log(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err}"
                }`);
                res.end(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err}"
                }`);
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
TaskRouter.route('/:key')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');

        if(req.method == "POST")next();

        dbHandler(req,"Tasks",(err,outputCallback) =>{
            if(err){
                if(err == "403 Forbidden"){
                    res.statusCode = 403;
                }
                else{
                    res.statusCode = 500;
                }
                console.log(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err}"
                }`);
                res.end(`{
                    "statusCode" : ${res.statusCode},
                    "error" : "${err}"
                }`, );
            }
            else{
                console.log('Test new module : ' + outputCallback.data() + ' to you!');
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
            "error" : "PUT operation not supported on /${collection}/${req.params.key}"
        }`);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.write('Updating the ' + collection + ': ' + req.params.key + '\n');
        res.end('Will update the ' + collection + ': ' + req.body);
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end('Deleting the ' + collection + ': '+ req.params.key );
    });


module.exports = TaskRouter;