// API
// ===
var ChoreModel = require('../models/chore');
var Config  = require('../config/config');
var CompletedChoreModel = require('../models/completed_chore');
var UserModel = require('../models/user');
var logger = require('../config/config').logger;
var async = require('async');
var _ = require('underscore');
module.exports = function(server) {

	// Sample Rest Call

	server.get('/menage/chores', function(req, res){
		logger.info('GET /menage/chores');
		return ChoreModel.find( function(err, chores) {
			if (!err) {
				return res.send(chores);
			}
			else {
				return logger.error(err);
			}
		});	
	});

	server.post('/menage/chores', function(req, res) {
		logger.info('POST /menage/chores');
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
				logger.info('POST /menage/chores', 'Conflict', 409);
				console.log('Conflict error', err);
				res.send('Conflict', 409);
			}
			else {
				if (err.name === 'ValidationError') {
					logger.info('POST /menage/chores', 'ValidationError', err);
					return res.send(Object.keys(err.errors).map(function(errField) {
						return err.errors[errField].message;
					}).join('. '), 406);
				}
				console.log(err);
				return err;
			}
			return;
		});
	});


	server.get('/menage/chores/completed', function(req, res) {
		console.log('/menage/chores/completed');
		var q=CompletedChoreModel.find({}, null).limit(req.query.limit);
		var data = [];
		q.exec( function(err, results) {
			if (!err) {
				async.each(results, function(result, each_callback){
					async.parallel({
						chore: function(para_callback) {
						 	ChoreModel.findById(result.chore, function(err, chore) {
								if (!err) {
									para_callback(null, chore);
								}
								else {
									para_callback(err, null);
								}
							});
						},
						user: function(para_callback) {
							UserModel.find(result.user, function(err, user) {
								if (!err) {
									para_callback(null, user);
								}
								else {
									para_callback(err, null);
								}
							});
						}
					}, function(err, results) {
						if (!err) {
							data.push({
								user:result.user,
								chore: results.chore
							});
							each_callback();
						}
					});
				}, function(err) {
					if (!err) {
						res.send(data);
					}
				});
			}
		});
	});
	
	server.put('/menage/chores/:id', function(req, res) {
		logger.info('PUT /chores/:id');
		var chore = _.omit(req.body,['_id','title']);
		return ChoreModel.findOneAndUpdate({_id:req.params.id}, chore, function(err, chore) {
			if (!err) {
				logger.info( 'PUT /menage/chores/' + req.params.id, 'Chore updated');
				return res.send(chore);
			}
			else {
				logger.error('PUT /menage/chores/:id','error', err);
			}
		});
	});	
	
	server.post('/menage/chores/:id/completed', function(req, res) {
		logger.info('POST /menage/chores/:id/completed', req.params.id);

		async.parallel({
			chore: function(callback) {
				ChoreModel.findOne({_id: req.params.id}, function(err, chore) {
					// console.log('chore', chore);
					if (!err && chore !== null) {
						callback(null, chore);
					}
					else {
						callback(err,null);
					}
				});
			},
			user: function(callback) {
				UserModel.findOne({username: req.body.username}, function(err, user) {
					// console.log('user', user);
					if (!err && user !== null) {
						callback(null, user);
					}
					else {

						console.log ('user null or error', err);
						callback(err, null);
					}
				});
			}
		},
		function(err, results) {
			if (!err){
				console.log('/POST/:id/completed', 'results', results);
				var completedChore = new CompletedChoreModel({
						chore:results.chore,
						user: req.body.user // bypass
				});
				return completedChore.save(function(err){
					if (!err) {
						logger.info('completechore saved');
						return res.send(completedChore);
					}
					else {
						res.send(err)
					}
				});

			}
			return err;

		});


	});

	server.delete('/menage/chores/:id', function(req, res) {
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

