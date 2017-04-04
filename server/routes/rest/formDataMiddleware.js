var formidable = require('formidable');

var formDataMiddleware = function (req, res, next) {
	var contentType = req.headers['content-type'];
	
	if (contentType != undefined){
		if (contentType.indexOf('multipart/form-data') == 0){
			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files) {
				if (err) {
				  console.error(err.message);
				}
				req.body = JSON.parse(JSON.stringify(fields));
			});			
		}
	}
	next();
}

module.exports = formDataMiddleware;