
const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var mahcines = new Schema({
    name: String,
    position : String,
    status : String,
    recipe : { cnt : Number}

});


module.exports = mongoose.model('machines', mahcines);
