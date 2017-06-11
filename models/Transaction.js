var guid = require('guid');
var mongoose = require('mongoose');
var settings = require('../appConfig.js');

var connection = mongoose.connect(settings.connectionString);

var Schema = mongoose.Schema;

var transacationSchema = new Schema({
    value: Number,
    description: String,
    category: String,
    userId: String,
    date: {type: Date, default: Date.now()}
})

var Transaction = connection.model('Transaction', transacationSchema);

module.exports = Transaction;