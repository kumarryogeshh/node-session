var express = require('express');
var bodyParser = require('body-parser');
var Stores = require('../models/store');

var storeRouter = express.Router();
storeRouter.use(bodyParser.json());

storeRouter.route('/')
.get(function(req, res, next){
        Stores.find({}, function(err, store){
            if(err) return next(err);
            res.json(store);
        });
    })

module.exports = storeRouter;
