var express = require('express');

var router = function(Category, Transaction){
    var categoryRouter = express.Router();

    categoryRouter
    .get('/categories/', function(req, res){
            Category.find({}, function(err, c){
                res.json(c);
            });            
        })
    .get('/categories/:id', function(req, res){
        var id = req.params.id;

        Category.findOne({'_id': id}, function(err, c){
            res.json(c);
        });
    })
    .post('/categories', function(req, res){
        var category = new Category(req.body);

        category.save();

        res.sendStatus(201);
    })
    .put('/categories/:id', function(req, res){
        req.body._id = req.params.id;

        Category.find({'_id': req.body._id}, function(err, originalCategories){
            var originalCategory = originalCategories[0];

            originalCategory.name = req.body.name;
            originalCategory.isIncome = req.body.isIncome;

            originalCategory.save();

            res.sendStatus(204);
        });
    })
    .delete('/categories/:id', function(req, res){
        var id = req.params.id;

        Category.remove({'_id': id}, function(err){
            res.sendStatus(204);
        });
    })
    .get('/categories/:name/transactions', function(req, res){
        var name = req.params.name;

        Transaction.find({category: name}, function(err, transactions){
            res.json(transactions);
        })
    });

    return categoryRouter;
}

module.exports = router;