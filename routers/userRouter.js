var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwtOptions = require('../jwtOptions.js');
var saltRounds = 10;

var router = function(Transaction, User){
    var userRouter = express.Router();

    userRouter
        .post('/users/login', function(req, res){
            var userLoginModel = {
                userName: req.body.userName,
                password: req.body.password
            };

            User.find({userName: userLoginModel.userName}, function(err, users){
                if(users.length >= 1){
                    var user = users[0];
                    bcrypt.compare(userLoginModel.password, user.password, function(err, same){
                        if(same){
                            var payload = {id: user._id};    
                            var token = jwt.sign(payload, jwtOptions.secretOrKey);

                            res.status(200).json({message: "OK", token: token});
                        }
                        else{
                            res.status(401).json({message: "User name or password is invalid."});
                        }
                    });
                } else{
                    res.status(401).json({message: "User name or password is invalid."});
                }
            })
        })
        .post('/users/', function(req, res){
            var user = new User(req.body);

            bcrypt.hash(user.password, saltRounds).then(function(hashedPassword){
                user.password = hashedPassword;
                user.save(function(err){
                    if(!err){
                        res.sendStatus(201);
                    }
                    else{
                        console.log(err);
                    }
                });
            });
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
                if(transactions.length == 0)
                {
                    res.json({currentBalance: 0});
                }
                else{
                    var summary = transactions.reduce((pv, cv) => pv + cv.value, 0);

                    res.json({currentBalance: summary});
                }
            }); 
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