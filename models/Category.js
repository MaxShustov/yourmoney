var guid = require('guid');
var mongoose = require('mongoose');

var connectionString = "mongodb://yourmoney-dev:06eoNQBtgbe5TwTsbYzv7tWJr0OeUDlZKMuSwGgxXk0MHtOAvoaRDdnYALy1yDXgxJPHnC6pg7g1PJoKgHM0jQ==@yourmoney-dev.documents.azure.com:10255/yourmoney?ssl=true";

var connection = mongoose.connect(connectionString);

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    _id: {type: String, default: guid.raw()},
    name: { type : String , unique : true, required : true }
}, {_id: false})

var Category = connection.model('Category', categorySchema);

module.exports = Category;