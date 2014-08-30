// CONFIG
// ======
var winston = require('winston');
exports.config = {
  listenPort: "2000",
  sessionSecret: 'bb-login-secret',
  cookieSecret: 'bb-login-secret',
  cookieMaxAge: (1000 * 60 * 60 * 24 * 365),
  database: {
    IP: "localhost",
    name: "chores_tracker",
    port: "27017",
  	db_connection:'mongodb://heroku:AloGHq0Fn6r10viV2ZLD_AvDlrzCHHjtv10HIN2hof_9YPhc2PWPRW8G3ZRc5E1i1_xSpjxHgQBfT9ucgN2Nfw@kahana.mongohq.com:10076/app29054970'
  },
  passport: {
    domain: 'app25772746.auth0.com',
    clientID: 'kJk7T528ulbkoiEHXt8GbM15DgegseXq',
    clientSecret: 'HePR4GIGZp2R3gmnfSbjtaVgRqtn-nTY4T4XbDBPcEww-oyZKeB1wR5suHeBToda',
    callbackURL: 'http://localhost:2000/callback',
    redirectUri: 'http://localhost:2000/callback'
  },
  auth0_api: {
    api_secret: 'iS0iTkQqMxm9zN9nWM1dm04eghgunf4ZpZ6FrGWycYv4DdrpM88m3scMHDrdNbSU',
    api_id: 'Y0T58gsOTMiApt0IMFtDw2Qg598vOCXN',
    token_uri: 'https://app25772746.auth0.com/oauth/token',
    users_uri: 'https://app25772746.auth0.com/api/users'
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
              domain: "app25772746.auth0.com",
              clientID: "kJk7T528ulbkoiEHXt8GbM15DgegseXq",
              callbackURL: "http://localhost:2000/callback",
              clientSecret: 'HePR4GIGZp2R3gmnfSbjtaVgRqtn-nTY4T4XbDBPcEww-oyZKeB1wR5suHeBToda',
              redirectUri: "http://localhost:2000/callback"
            };

        case 'production':
            return {
              domain: "app25772746.auth0.com",
              clientID: "kJk7T528ulbkoiEHXt8GbM15DgegseXq",
              callbackURL: "http://collarbone.herokuapp.com/callback",
              clientSecret: 'HePR4GIGZp2R3gmnfSbjtaVgRqtn-nTY4T4XbDBPcEww-oyZKeB1wR5suHeBToda',
              redirectUri: "http://collarbone.herokuapp.com/callback"
            };

        case 'test': 
          return {
            domain: "app25772746.auth0.com",
            clientID: "kJk7T528ulbkoiEHXt8GbM15DgegseXq",
            callbackURL: "http://localhost:2000/callback",
            clientSecret: 'HePR4GIGZp2R3gmnfSbjtaVgRqtn-nTY4T4XbDBPcEww-oyZKeB1wR5suHeBToda',
            redirectUri: "http://localhost:2000/callback"
          }

        default:
            return {error: 'Unknown or no environment specified'};
    }
};

