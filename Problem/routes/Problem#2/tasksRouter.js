//npm node module
const express = require('express');
const bodyParser = require('body-parser');

//create TaskRouter as express router
const TaskRouter = express.Router();

//use npm node module
TaskRouter.use(bodyParser.json());

//Respond keyword
const keywordSigular = "Task"; // replace Task by ' + keywordSigular + ' // for extensible to another router
const keywordPlural = "Tasks"; // replace Tasks by ' + keywordPlural + ' // for extensible to another router

//route for all Tasks
TaskRouter.route('/')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next(); //continue to the next specific request
    })
    .get((req,res,next) => { //execute after .all(...) by next(); include parameter 
        res.end('Will send all the ' + keywordPlural + ' to you!');
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

//route with TaskId parameter
TaskRouter.route('/:TaskId')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next(); //continue to the next specific request
    })
    .get((req,res,next) => { //execute after .all(...) by next(); include parameter 
        res.end('Will send the ' + keywordSigular + ': ' 
            + req.params.TaskId + ' to you!');
    })
    .post((req,res,next) => { //use http POST REST request
        res.statusCode = 403;
        res.end('POST operation not supported on /' + keywordPlural + '/'
            + req.params.TaskId);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.write('Updating the ' + keywordSigular + ': ' + req.params.TaskId + '\n');
        res.end('Will update the ' + keywordSigular + ': ' + req.body);
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end('Deleting the ' + keywordSigular + ': '+ req.params.TaskId );
    });


module.exports = TaskRouter;