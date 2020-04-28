const jwt = require('jsonwebtoken');
const { stopRequest } = require('micro-mw');

const config = require('../_config');

module.exports = async (req, res) => {
  const token = req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks expiration
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({message: 'Failed to authenticate token.'});
        return stopRequest(req);
      }
      // if everything is good, save to request for use in other routes req.decoded = decoded;
      req.decoded = decoded;
    });
  } else {
    // if there is no token
    // return an HTTP response of 401 (unauthorized - https://httpstatuses.com/401) and an error message
    res.status(401).send({message: 'No token provided.'});
    return stopRequest(req);
  }
};