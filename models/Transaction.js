var guid = require('guid');

var Transaction = function(transacation){
    this.id  = guid.raw();
    this.value = transacation.value;
    this.description = transacation.description;
    this.category = transacation.category;
}

module.exports = Transaction;