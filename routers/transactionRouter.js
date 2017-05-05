var express = require('express');

var router = function(Trasaction, transactionRepository){
    var transactionRouter = express.Router();

    transactionRouter
    .get('/transactions', function(req, res){
            var transactions = transactionRepository.getAll();

            res.json(transactions);
        })
    .get('/transactions/:id', function(req, res){
        var id = req.params.id;
        var transaction = transactionRepository.getById(id);

        res.json(transaction);
    });

    return transactionRouter;
}

module.exports = router;