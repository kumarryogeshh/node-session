var express = require('express');
var bodyParser = require('body-parser');
var Stores = require('../models/store');
var Verify = require('./verify');
var storeRouter = express.Router();
storeRouter.use(bodyParser.json());

storeRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
    console.log(req.decoded._doc.username);
        Stores.find({}, function(err, store){
            if(err) return next(err);
            res.json(store);
        });
    })

  .post(function (req, res, next) {
        Stores.create(req.body, function(err, store){
            if(err) return next(err);
            var id = store.store_id;

            var responseToSend = {
                "log": "Store added",
                "data": id,
                "flag": constants.responseFlags.ACTION_COMPLETE
            };

            res.status(200).send(responseToSend);
        });
      });
module.exports = storeRouter;
