var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var jwtOptions = require('../jwtOptions.js');
var saltRounds = 10;

var router = function(Transaction, User){
    var userRouter = express.Router();

    userRouter
        .post('/login', function(req, res){
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
                    if(err){
                        res.status(500).json({message: "Some error has occured.", err: err});
                    }
                    else{
                        res.status(201).json({message: "User has been created."});
                    }
                });
            });
        })
        .put('/users/', passport.authenticate('jwt', {session: false}), function(req, res){
            req.body._id = req.user._id;

            User.find({'_id': req.body._id}, function(err, originalUsers){
                if(err){
                    res.status(500).json({message: "Can not update the user.", err: err});
                }
                else{
                    bcrypt.hash(req.body.password, saltRounds).then(function(hashedPassword){                    
                        var originalUser = originalUsers[0];
                        originalUser.userName = req.body.userName;
                        originalUser.password = hashedPassword;
                        originalUser.email = req.body.email;
                        originalUser.save(function(err){
                            if(err){
                                res.status(500).json({message: "Can not update the user.", err: err});
                            }
                            else{
                                res.status(204).json({message: "User has been updated."});
                            }
                        });
                    });
                }
            });
        })
        .get('/users/', passport.authenticate('jwt', {session: false}), function(req, res){
            User.find({}, function(err, users){
                var userNames = users.map(function(user){
                    return {userName: user.userName};
                })

                res.json(userNames);
            })
        });

    return userRouter;
}

module.exports = router;