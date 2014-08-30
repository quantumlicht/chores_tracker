var mongoose = require('mongoose');

var ChoreSchema = require('../schemas/chore');

var Chore = mongoose.model('Chore', ChoreSchema);

module.exports = Chore;
