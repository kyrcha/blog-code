const { applyMiddleware } = require('micro-mw');
const { connect } = require('./_mongoose');
const User = require('./_models/user');
const jwtMdlwr = require('./_middlewares/jwt');

module.exports = applyMiddleware([ jwtMdlwr ], async (req, res) => {
  await connect();
  const users = await User.find({});
  return res.json(users);
});
