var express = require('express');
var bodyParser = require('body-parser');
var Transaction = require('./models/Transaction.js');
var transactionRepository = require('./helpers/transactionsRepository.js');

var app = express();

var transactionsRouter = require('./routers/transactionRouter')(Transaction, transactionRepository);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', transactionsRouter);

var port = process.env.port || 53467;

app.listen(port);