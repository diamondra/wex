module.exports = {
    development: {
        db: {
			driver : 'mongodb',
            port: 27017,
            host: '127.0.0.1',
            name: 'wex',
            user: 'wex',
            pass: 'wex'
            },
        http: {
            port: 3002
            },
		gulp : {
			src: 'client/src',
			public : 'client/public/dev',
			e2e: 'e2e'
		}
	},
    production: {
        db: {
			driver : 'mongodb',
            port: 29017,
            host: '::mongo host::',
            name: '::collection name::',
            user: '::db username::',
            pass: '::db password::'
            },
        http: {
            port: 80
            },
		gulp : {
			src: 'client/src',
			public : 'client/public/release',
			e2e: 'e2e'
		}		
    }
};