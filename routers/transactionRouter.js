var express = require('express');

var router = function(Transaction, transactionRepository){
    var transactionRouter = express.Router();

    transactionRouter
    .get('/transactions', function(req, res){
            Transaction.find({}, function(err, t){
                res.json(t);
            });            
        })
    .get('/transactions/:id', function(req, res){
        var id = req.params.id;

        Transaction.findOne({'_id': id}, function(err, t){
            res.json(t);
        });
    })
    .post('/transactions', function(req, res){
        var transaction = new Transaction(req.body);

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

            originalTransaction.save();

            res.sendStatus(204);
        });
    })
    .delete('/transactions/:id', function(req, res){
        var id = req.params.id;

        Transaction.remove({'_id': id}, function(err){
            res.sendStatus(204);
        });
    });

    return transactionRouter;
}

module.exports = router;