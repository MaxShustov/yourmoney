var guid = require('guid');

var Transaction = function(value, description, category){
    this.id  = guid.raw();
    this.value = value;
    this.description = description;
    this.category = category;
}

module.exports = Transaction;