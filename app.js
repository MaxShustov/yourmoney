var express = require('express');
var Transaction = require('./models/Transaction.js');
var transactionRepository = require('./helpers/transactionsRepository.js');

var app = express();

var transactionsRouter = require('./routers/transactionRouter')(Transaction, transactionRepository);

app.use('/api', transactionsRouter);

var port = process.env.port || 8080;

app.listen(port);