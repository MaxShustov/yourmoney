var guid = require('guid');
var mongoose = require('mongoose');
var settings = require('../appConfig.js');

var connection = mongoose.connect(settings.connectionString);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: { type : String , unique : true, required : true },
    password: String,
    email: String
})

var User = connection.model('User', userSchema);

module.exports = User;