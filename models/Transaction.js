var guid = require('guid');
var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://127.0.0.1:27017/yourmoney');

var Schema = mongoose.Schema;

var transacationSchema = new Schema({
    _id: {type: String, default: guid.raw()},
    value: Number,
    description: String,
    category: String
}, {_id: false})

var Transaction = connection.model('Transaction', transacationSchema);

module.exports = Transaction;