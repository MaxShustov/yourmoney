var express = require('express');

var router = function(Trasaction, transactionRepository){
    var transactionRouter = express.Router();

    transactionRouter.get('/transactions', function(req, res){
        var transactions = transactionRepository.getAll();

        res.json(transactions);
    });

    return transactionRouter;
}

module.exports = router;