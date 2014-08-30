
/*
 * GET blog page Password protect it.
 */

module.exports = function(app) {
	app.get('/admin', function(req, res) {
  		res.render('blog', {token: 'This is a token', layout: 'admin'});
	});
};