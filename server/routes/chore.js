// API
// ===
var ChoreModel = require('../models/chore');
var logger = require('../config/config').logger;
var _ = require('underscore');
module.exports = function(server) {

	// Sample Rest Call

	server.get('/chores', function(req, res){
		logger.info('GET /chores');
		return ChoreModel.find( function(err, chores) {
			if (!err) {
				return res.send(chores);
			}
			else {
				return logger.error(err);
			}
		});	
	});

	server.post('/chores', function(req, res) {
		logger.info('POST /chores');
		var chore = new ChoreModel({
			title: req.body.title,
			username: req.body.username,
			user_id:req.body.user_id,
			creationDate: new Date(),
			lastCompleted: new Date(),
			frequency: Number(req.body.frequency)
		});

		return chore.save(function(err){
			if (!err) {
				logger.info('chore created');
				return res.send(chore);
			}
			if (err.code === 11000) {
				logger.info('POST /chores', 'Conflict', 409);
				res.send('Conflict', 409);
			}
			else {
				if (err.name === 'ValidationError') {
					logger.info('POST /chores', 'ValidationError', err);
					return res.send(Object.keys(err.errors).map(function(errField) {
						return err.errors[errField].message;
					}).join('. '), 406);
				}
			}
			return;
		});
	});

	server.put('/chores/:id', function(req, res) {
		logger.info('PUT /chores/:id');

		var chore = _.omit(req.body,['_id']);
		return ChoreModel.findOneAndUpdate({}, chore, function(err, chore) {
			if (!err) {
				logger.info( 'Chore updated');
				return res.send(chore);
			}
			else {
				logger.error('/chores/:id','error', err);
			}
		});
	});

	server.delete('/chores/:id', function(req, res) {
		logger.info('Deleting Chore with id', req.params.id);
		return ChoreModel.findById(req.params.id, function(err, chore) {
			if (!err) {
				return chore.remove(function(err) {
					if (!err) {
						logger.info( 'Chore deleted');
						return res.send(new ChoreModel({id:req.params.id}));
					}
					else {
						logger.info(err);
					}
				});
			}
			else {
				logger.info(err);
			}
		});
	});
}

