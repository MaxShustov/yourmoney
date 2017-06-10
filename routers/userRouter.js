var express = require('express');

var router = function(Transaction, User){
    var userRouter = express.Router();

    userRouter
        .post('/users/login', function(req, res){
            User.find({userName: req.body.userName}, function(err, users){
                var userId = users[0]._id;

                res.json({UserId: userId});
            })
        })
        .post('/users/', function(req, res){
            var user = new User(req.body);

            user.save();

            res.sendStatus(201);
        })
        .get('/users/', function(req, res){
            User.find({}, function(err, users){
                var userNames = users.map(function(user){
                    return {userName: user.userName};
                })

                res.json(userNames);
            })
        })
        .get('/users/:id/summary', function(req, res){
            Transaction.find({}, function(err, transactions){
                var summary = transactions.reduce((pv, cv) => pv.value + cv.value);

                res.json({currentBalance: summary});
            }, 0); 
        });

    return userRouter;
}

module.exports = router;