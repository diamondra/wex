var config = require('./server/config')[(process.env.NODE_ENV || "dev")];
var mongoose = require('mongoose');

console.log("starting server in [" + (process.env.NODE_ENV || "dev") + "] environment...");

// Use native Node promises
mongoose.Promise = global.Promise;

/* TODO : add user to connect to mongodb */
var uri = config.db.driver + '://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
var dbOptions = {};
mongoose.connect(uri, dbOptions, function(err) {
	if (err){
		throw err;
	}
	console.log('connection to mongodb succesful');
	
	const app = require('./server');
	app.listen(config.http.port, function (err) {
		if (err) {
			throw err;
		}
		console.log(`server is listening on ${config.http.port}...`)
	})
});

