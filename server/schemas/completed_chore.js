var mongoose = require('mongoose');
var CompletedChoreSchema = new mongoose.Schema({
  chore: {type: mongoose.Schema.Types.ObjectId, ref: 'Chore'},
  user: {type: Object}
});


module.exports = CompletedChoreSchema;


