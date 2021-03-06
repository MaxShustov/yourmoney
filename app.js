var express = require('express');
var bodyParser = require('body-parser');
var Transaction = require('./models/Transaction.js');
var User = require('./models/User.js');
var Category = require('./models/Category.js');
var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var jwtOptions = require('./jwtOptions.js');
var cors = require('cors');

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done){
    User.findById(jwt_payload.id, function(err, user){
        if(err){
            done(err);
        }
        else if(user){
            done(null, user);
        }
        else{
            done(null, false);
        }
    });
});

passport.use(strategy);

var app = express();

var whitelist = process.env.whitelist || ['http://localhost:4243', 'http://localhost:4200'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response 
    }else{
        corsOptions = { origin: false } // disable CORS for this request 
    }
    callback(null, corsOptions) // callback expects two parameters: error and options 
}

app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate));

var transactionsRouter = require('./routers/transactionRouter')(Transaction);
var userRouter = require('./routers/userRouter')(Transaction, User);
var categoryRouter = require('./routers/categoryRouter.js')(Category, Transaction);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/api', userRouter);
app.use('/api', passport.authenticate('jwt', {session: false}));
app.use('/api', transactionsRouter);
app.use('/api', categoryRouter);

var port = process.env.PORT || 53467;

app.set('port', port);

app.listen(port, function(){
    console.log('Node app is running on port', app.get('port'));
});