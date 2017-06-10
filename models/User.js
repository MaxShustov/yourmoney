var guid = require('guid');
var mongoose = require('mongoose');

var connectionString = "mongodb://yourmoney-dev:06eoNQBtgbe5TwTsbYzv7tWJr0OeUDlZKMuSwGgxXk0MHtOAvoaRDdnYALy1yDXgxJPHnC6pg7g1PJoKgHM0jQ==@yourmoney-dev.documents.azure.com:10255/yourmoney?ssl=true";

var connection = mongoose.connect(connectionString);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: {type: String, default: guid.raw()},
    userName: String,
    password: String,
    email: String
}, {_id: false})

var User = connection.model('User', userSchema);

module.exports = User;