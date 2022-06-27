//npm node module
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//file node module
//none

//URLs const
const hostname = "localhost";
const port = 3000;

//create app as express
const app = express();

//use npm node module
app.use(morgan('dev'));
app.use(bodyParser.json());

//use file node module
//none

//use public static file 
app.use(express.static(__dirname+'/public'));

//not yet support others error handling
app.use((req, res, next) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    
    res.end(`<html><body><h1>Error ${res.statusCode} : ${req.url} not found!</h1></body></html>`);
});

//create server by http module
const server = http.createServer(app);

//starting server
server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}`);
});