const express = require('express');
const app = express();

// import morgan package
const morgan = require('morgan');
//use it
app.use(morgan('dev'));

// import body-parser
const bodyParser = require('body-parser');
// let's use it
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// defining routes
const ordersRoutes = require('./routes/orders')
app.use('/orders', ordersRoutes);


app.use((req, res, next) => {
    req.header('Access-Controll-Allow-Orgin','*');
    req.header(
        'Access-Controll-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

module.exports = app;