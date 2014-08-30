
/*
 * GET home page.
 */

module.exports = function(app) {
	app.get('/menage', function(req, res) {
  		res.render('home', { title: 'Movie Trivia' });
	});
};
