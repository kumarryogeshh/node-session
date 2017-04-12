var config = require('config');
var uri = config.get('db.host');
var db_user = config.get('db.user');
var db_password = config.get('db.password');

var mongoose = require('mongoose');

mongoose.connect(uri, {user: db_user, pass: db_password});

module.exports = mongoose;
