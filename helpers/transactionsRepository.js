var Transaction = require('../models/Transaction.js');

var transactions = [];

transactions.push(new Transaction({value: -100, description: 'Milk', category: 'Food'}));
transactions.push(new Transaction({value: 100, description: 'Salary', category: 'Salary'}));
transactions.push(new Transaction({value: -100, description: 'Mac book Pro', category: 'Stuff'}));

var repository = function(){
    return {
        getAll: function(){
            // var transaction = new Transaction({value: -100, description: 'Milk', category: 'Food'});

            // transaction.save();

            Transaction.find({}, function(err, t){
                return t;
            });
        },
        getById: function(id){
            return transactions.find(element => element.id === id);
        },
        add: function(transaction){
            transactions.push(transaction);
        },
        remove: function(id){
            for(var i = 0; i < transactions.length; i ++){
                if(transactions[i].id === id){
                    transactions.splice(i, 1);
                }
            }
        },
        update: function(transaction){
            var originalTransaction = transactions.find(element => element.id === transaction.id);

            originalTransaction.value = transaction.value;
            originalTransaction.description = transaction.description;
            originalTransaction.category = transaction.category;
        }
    }
}

module.exports = repository();