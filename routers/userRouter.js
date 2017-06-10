var express = require('express');

var router = function(Transaction, User){
    var userRouter = express.Router();

    userRouter
        .post('/users/login', function(req, res){
            var userLoginModel = {
                userName: req.body.userName,
                password: req.body.password
            };

            User.find(userLoginModel, function(err, users){
                if(users.length >= 1){
                    var userId = users[0]._id;

                    res.json({UserId: userId});
                } else{
                    res.status(403);

                    res.send('Auth failed');
                }
            })
        })
        .post('/users/', function(req, res){
            var user = new User(req.body);

            user.save();

            res.sendStatus(201);
        })
        .put('/users/:id', function(req, res){
            req.body._id = req.params.id;

            User.find({'_id': req.body._id}, function(err, originalUsers){
                var originalUser = originalUsers[0];

                originalUser.userName = req.body.userName;
                originalUser.password = req.body.password;
                originalUser.email = req.body.email;

                originalUser.save();

                res.sendStatus(204);
            });
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
            var userId = req.params.id;

            Transaction.find({userId: userId}, function(err, transactions){
                var summary = transactions.reduce((pv, cv) => pv.value + cv.value);

                res.json({currentBalance: summary});
            }, 0); 
        })
        .get('/users/:id/transactions/', function(req, res){
            var userId = req.params.id;

            Transaction.find({userId: userId}, function(err, transactions){
                res.json(transactions);
            })
        });

    return userRouter;
}

module.exports = router;