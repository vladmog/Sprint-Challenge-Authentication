const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model')
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const authenticate = require('./authenticate-middleware');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db.add(credentials)
      .then((response) => {
          res.status(200).json(response)
      })
      .catch((err) => {
          console.log("ERR", err)
          res.status(500).json(err)
      })
});

router.post('/login', (req, res) => {
  const credentials = req.body
  db.findByUsername(credentials.username)
      .then((user) => {
          if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
              return res.status(401).json({ error: 'You shall not pass!' });
          } else {
              const token = getJwt(user);
              res.status(200).json({
                  message: `Welcome ${user.username}!`,
                  token,
              });
          }
      })
      .catch((err) => {
          console.log("ERR", err)
          res.status(500).json({ message: "doh" })
      })
});

function getJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '8h',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}



module.exports = router;
