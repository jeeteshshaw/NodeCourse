const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const dishRouter = require('./routes/dashRouter');
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);

app.use(express.static(__dirname+"/public"));


app.use((req, res, next) =>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express app</h1></body></html>');
});

const server = http.createServer(app);
server.listen(3000,'localhost', () =>{
    console.log("Server is running on localhost:3000");
})