
const mongoose = require('mongoose');



var alarmschema = new Schema({
    type:  String,
    machine: String,
    date:   String,
    msg:   String,
    meta: [{ time: String, code: String,contents:String,cause:String,execute:String,type:String }]
  });

  module.exports = mongoose.model('alarmlog', alarmschema);
