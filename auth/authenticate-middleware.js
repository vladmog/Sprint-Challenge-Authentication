const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.token;
  if (token){
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if(!err){
              req.decodedJwt = decodedToken;
              next();
          } else {
              res.status(401).json({ you: 'shall not pass!' });
          }
      })
  }else{
      res.status(400).json({message: "Bad request"})
  }
};
