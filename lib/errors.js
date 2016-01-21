
/**
 * Application errors
 */
module.exports = function(app) {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    console.error(err.message);

    if(err.status === 404) {
      res.render('404.jade', { 'req': req });
    } else {
      var acceptHeader = req.headers.accept || '';
      if(acceptHeader.indexOf('application/json') !== -1) {
        res.json({
          title: "An error occurred",
          message: err.message,
          error: {}
        });
      } else {
        res.render('500.jade', {
          'req': req,
          'err': err
        });
      }
    }
	});
};