var express = require('express');
var bodyParser = require('body-parser');
var Transaction = require('./models/Transaction.js');

var app = express();

var transactionsRouter = require('./routers/transactionRouter')(Transaction);
var userRouter = require('./routers/userRouter')(Transaction);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', transactionsRouter);
app.use('/api', userRouter);

var port = process.env.port || 53467;

app.listen(port);