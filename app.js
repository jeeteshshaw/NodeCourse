const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();// it will continue on serching for /dishes url 
});

app.get('/dishes', (req, res, next) =>{
    res.end('Will send all the dishes to you!');
})
app.post('/dishes', (req, res, next) =>{
    res.end('Will add the dish: '+ req.body.name + 
            'With details '+ req.body.description);
})
app.put('/dishes', (req, res, next) =>{
    res.statusCode = 403;
    res.end('put operation not supported on dishes');
})
app.delete('/dishes', (req, res, next) =>{
    res.end('Delete all the dishes !');
})



app.get('/dishes/:dishId', (req, res, next) =>{
    res.end('Will send detail of the dish: '
        + req.params.dishId + ' to you');
})
app.post('/dishes/:dishId', (req, res, next) =>{
    res.statusCode = 403;
    res.end('Post operation not supported on /dishes/'+ req.params.dishId);
})
app.put('/dishes/:dishId', (req, res, next) =>{
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: '+ req.body.name
    +' with detail ' + req.body.description);
})
app.delete('/dishes/:dishId', (req, res, next) =>{
    res.end('Delete dishes: ' + req.params.dishId);
})

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