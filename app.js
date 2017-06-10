var express = require('express');
var bodyParser = require('body-parser');
var Transaction = require('./models/Transaction.js');
var User = require('./models/User.js');

var app = express();

var transactionsRouter = require('./routers/transactionRouter')(Transaction);
var userRouter = require('./routers/userRouter')(Transaction, User);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', transactionsRouter);
app.use('/api', userRouter);

var port = process.env.PORT || 53467;

app.set('port', port);

app.listen(port, function(){
    console.log('Node app is running on port', app.get('port'));
});