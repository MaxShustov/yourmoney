var express = require('express');

var router = function(Transaction){
    var transactionRouter = express.Router();

    transactionRouter
    .get('/transactions', function(req, res){
            var updatedDate = Date.parse(req.query.updateDate);

            Transaction.find({userId: req.user._id}, function(err, transactions){

                if(updatedDate){
                    transactions = transactions.filter(function(transaction){
                        return transaction.updateDate > updatedDate;
                    });
                }

                res.json(transactions);
            });            
        })
    .get('/transactions/summary', function(req, res){
        var userId = req.user._id;

        var mapReduce = {};
        mapReduce.map = function() { 
            emit(this.userId, this.value);
        };
        mapReduce.reduce = function(key, values) { if(values){
            return values.reduce(function(a, b){
                return a + b;
            }, 0);
        } };

        Transaction.mapReduce(mapReduce, function(err, totalSums){
            if(err){
                res.status(500).json({message: "Something goes wrong ...", err: err});
            }

            var userTotalSum = totalSums.filter(sum => sum._id == userId);

            res.json({message: "OK", totalSum: userTotalSum[0].value});
        })
    })
    .get('/transactions/:id', function(req, res){
        var id = req.params.id;

        Transaction.findOne({userId: req.user._id, '_id': id}, function(err, t){
            res.json(t);
        });
    })
    .post('/transactions', function(req, res){
        var transaction = new Transaction(req.body);
        transaction.userId = req.user._id;

        transaction.save();

        res.sendStatus(201);
    })
    .put('/transactions/:id', function(req, res){
        req.body._id = req.params.id;

        Transaction.find({'_id': req.body._id}, function(err, originalTransactions){
            var originalTransaction = originalTransactions[0];

            originalTransaction.value = req.body.value;
            originalTransaction.description = req.body.description;
            originalTransaction.category = req.body.category;
            originalTransaction.date = req.body.date;

            originalTransaction.save();

            res.sendStatus(204);
        });
    })
    .delete('/transactions/:id', function(req, res){
        var id = req.params.id;

        Transaction.remove({userId: req.user._id, '_id': id}, function(err){
            res.sendStatus(204);
        });
    });

    return transactionRouter;
}

module.exports = router;