var express = require('express');

var router = function(Transaction){
    var userRouter = express.Router();

    userRouter
        .get('/users/:id/summary', function(req, res){
            Transaction.find({}, function(err, transactions){
                var summary = transactions.reduce((pv, cv) => pv.value + cv.value);

                res.json({currentBalance: summary});
            }, 0); 
        });

    return userRouter;
}

module.exports = router;