var mongoose = require('mongoose');

var ChoreSchema = new mongoose.Schema({
  title: {type:String, required: true, unique:true},
  username: {type:String, required: true},
  user_id: {type:String, required: true},
  creationDate: {type:Date, required: true, default: new Date()},
  lastCompleted: {type:Date},
  frequency: {type:Number, required: true}
});


module.exports = ChoreSchema;


