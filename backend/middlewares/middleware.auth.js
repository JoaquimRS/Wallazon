var {expressjwt: jwt } = require('express-jwt');
var { secret } = require('../config');

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

var middlewareAuth = {
  required: jwt({
    secret: secret,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"]
  }),
  optional: jwt({
    secret: secret,
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"]
  })
};

module.exports = middlewareAuth;
