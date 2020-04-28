const { connect } = require('./_mongoose');
const User = require('./_models/user');

module.exports = async (req, res) => {
  await connect();
  const users = await User.find({});
  return res.json(users);
};