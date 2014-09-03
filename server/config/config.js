// CONFIG
// ======
var winston = require('winston');
exports.config = {
  listenPort: "2000",
  ROOT_URL: 'menage#',
  sessionSecret: 'bb-login-secret',
  cookieSecret: 'bb-login-secret',
  cookieMaxAge: (1000 * 60 * 60 * 24 * 365),
  database: {
    IP: "localhost",
    name: "chores_tracker",
    port: "27017",
  	db_connection:'mongodb://heroku:AloGHq0Fn6r10viV2ZLD_AvDlrzCHHjtv10HIN2hof_9YPhc2PWPRW8G3ZRc5E1i1_xSpjxHgQBfT9ucgN2Nfw@kahana.mongohq.com:10076/app29054970'
  }
};


exports.logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'access.log', colorize:false, json:false})
    ]
});

exports.env_config = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
              domain: "app29054970.auth0.com",
              clientID: "mYCYA7UsTqePSwzJvKjrYx9GRbD3dF0U",
              callbackURL: "http://localhost:2000/callback/menage",
              clientSecret: 'TtFYb6CRVYO4fZTdSfRcyAhTdQNt43ycf8OsOUoi0SBloblAYz9zfVL2TioHiutp',
              redirectUri: "http://localhost:2000/callback/menage"
            };

        case 'production':
            return {
              domain: "app29054970.auth0.com",
              clientID: "mYCYA7UsTqePSwzJvKjrYx9GRbD3dF0U",
              callbackURL: "http://collarbone.herokuapp.com/callback/menage",
              clientSecret: 'TtFYb6CRVYO4fZTdSfRcyAhTdQNt43ycf8OsOUoi0SBloblAYz9zfVL2TioHiutp',
              redirectUri: "http://collarbone.herokuapp.com/callback/menage"
            };

        case 'test': 
          return {
            domain: "app29054970.auth0.com",
            clientID: "mYCYA7UsTqePSwzJvKjrYx9GRbD3dF0U",
            callbackURL: "http://localhost:2000/callback/menage",
            clientSecret: 'TtFYb6CRVYO4fZTdSfRcyAhTdQNt43ycf8OsOUoi0SBloblAYz9zfVL2TioHiutp',
            redirectUri: "http://localhost:2000/callback/menage"
          }

        default:
            return {error: 'Unknown or no environment specified'};
    }
};

