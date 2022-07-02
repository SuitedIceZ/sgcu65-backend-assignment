//npm node module
const express = require('express');
const bodyParser = require('body-parser');

//file node module
const dbHandler = require("../firebaseModule/firestoreHandler");
const dbErrorHandler = require("../firebaseModule/firestoreErrorHandler");

//create AssignRouter as express router
const AssignRouter = express.Router();

//use npm node module
AssignRouter.use(bodyParser.json());

//configulation
const routerName = "Assign"; // collection name

AssignRouter.route('/')
    .all((req,res,next)=>{
        res.statusCode = 405;
        res.setHeader('Content-Type','application/json');
        res.end(`{
            "statusCode" : ${res.statusCode},
            "error" : "${req.method} operation not supported on /${routerName}"
        }`);
    })

AssignRouter.route('/:key') //key is UserID or User's name surname
    .all((req,res,next)=>{
        console.log("Reached AssignRouter.route('/:key')");
        res.setHeader('Content-Type','application/json');
        if(req.method == "PUT")next();
        else{
            res.statusCode = 405;
            res.end(`{
                "statusCode" : ${res.statusCode},
                "error" : "${req.method} operation not supported on /${routerName}/${req.params.key}"
            }`);
        }
    })
    .put((req,res,next) => { //use http PUT REST request
        var output = "";
        dbHandler(req,routerName,(err,outputCallback) =>{
            if(err){
                dbErrorHandler(err,(respond) => {
                    res.statusCode = respond.statusCodeData();
                    res.end(respond.endData());
                })
                return false;
            }
            else{
                output = outputCallback.data();
                res.statusCode = 200;
                res.end(output);
            }
        })
    })


module.exports = AssignRouter;