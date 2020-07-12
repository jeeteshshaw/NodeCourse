const express = require('express');
const DishRoute = express.Router();
const bodyParser = require('body-parser');

DishRoute.use(bodyParser.json());
DishRoute.route('/')

.all(  (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();// it will continue on serching for /dishes url 
})

.get(  (req, res, next) =>{
    res.end('Will send all the dishes to you!');
})
.post(  (req, res, next) =>{
    res.end('Will add the dish: '+ req.body.name + 
            'With details '+ req.body.description);
})
.put(  (req, res, next) =>{
    res.statusCode = 403;
    res.end('put operation not supported on dishes');
})
.delete(  (req, res, next) =>{
    res.end('Delete all the dishes !');
})



.get( (req, res, next) =>{
    res.end('Will send detail of the dish: '
        + req.params.dishId + ' to you');
})
.post((req, res, next) =>{
    res.statusCode = 403;
    res.end('Post operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) =>{
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: '+ req.body.name
    +' with detail ' + req.body.description);
})
.delete((req, res, next) =>{
    res.end('Delete dishes: ' + req.params.dishId);
});

module.exports = DishRoute;