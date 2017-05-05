var Transaction = require('../models/Transaction.js');

var transactions = [];

transactions.push(new Transaction(-100, 'Milk', 'Food'));
transactions.push(new Transaction(+100, 'Salary', 'Salary'));
transactions.push(new Transaction(-100, 'Mac Book Pro', 'Stuff'));

var repository = function(){
    return {
        getAll: function(){
            return transactions;
        },
        getById: function(id){
            return transactions.find(element => element.id === id);
        }
    }
}

module.exports = repository();