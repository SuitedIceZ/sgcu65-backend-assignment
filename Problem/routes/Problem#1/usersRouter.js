//npm node module
const express = require('express');
const bodyParser = require('body-parser');

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

// not support UserId yet!
//route with UserId parameter
/*
UserRouter.route('/:UserId')
    .all((req,res,next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next(); //continue to the next specific request
    })
    .get((req,res,next) => { //execute after .all(...) by next(); include parameter 
        res.end('Will send the ' + keywordSigular + ': ' 
            + req.params.UserId + ' to you!');
    })
    .post((req,res,next) => { //use http POST REST request
        res.statusCode = 403;
        res.end('POST operation not supported on /' + keywordPlural + '/'
            + req.params.UserId);
    })
    .put((req,res,next) => { //use http PUT REST request
        res.write('Updating the ' + keywordSigular + ': ' + req.params.UserId + '\n');
        res.end('Will update the ' + keywordSigular + ': ' + req.body.name + 
            ' with detail: ' + req.body.description);
    })
    .delete((req,res,next) => { //use http DELETE REST request
        res.end('Deleting the ' + keywordSigular + ': '+ req.params.UserId );
    });
*/

module.exports = UserRouter;