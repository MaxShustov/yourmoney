var guid = require('guid');
var mongoose = require('mongoose');
var settings = require('../appConfig.js');

var connection = mongoose.connect(settings.connectionString);

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: { type : String , unique : true, required : true },
    isIncome: {type: Boolean, default: false}
})

var Category = connection.model('Category', categorySchema);

module.exports = Category;