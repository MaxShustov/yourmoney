var guid = require('guid');
var mongoose = require('mongoose');

var connectionString = "mongodb://yourmoney-dev:06eoNQBtgbe5TwTsbYzv7tWJr0OeUDlZKMuSwGgxXk0MHtOAvoaRDdnYALy1yDXgxJPHnC6pg7g1PJoKgHM0jQ==@yourmoney-dev.documents.azure.com:10255/yourmoney?ssl=true";

var connection = mongoose.connect(connectionString);

var Schema = mongoose.Schema;

var transacationSchema = new Schema({
    _id: {type: String, default: guid.raw()},
    value: Number,
    description: String,
    category: String,
    userId: String,
    date: {type: Date, default: Date.now()}
}, {_id: false})

var Transaction = connection.model('Transaction', transacationSchema);

module.exports = Transaction;