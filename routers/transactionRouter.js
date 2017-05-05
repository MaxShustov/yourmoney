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
    })
    .post('/transactions', function(req, res){
        var transaction = new Trasaction(req.body);

        transactionRepository.add(transaction);

        res.sendStatus(201);
    })
    .put('/transactions/:id', function(req, res){
        req.body.id = req.params.id;

        transactionRepository.update(req.body);

        res.sendStatus(204);
    })
    .delete('/transactions/:id', function(req, res){
        var id = req.params.id;

        transactionRepository.remove(id);

        res.sendStatus(204);
    });

    return transactionRouter;
}

module.exports = router;