var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var storeSchema = new Schema({
        store_id: {
            type: Number,
            required: true
        },
        store_name: {
            type: String,
            required: true
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zipcode: {
            type: String
        },
        country: {
            type: String
        }
    }, {
        timestamps: true
    }
);

var Store = mongoose.model('Store', storeSchema);

module.exports = Store;
