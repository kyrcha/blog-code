function throwErr(msg) {
    throw new Error(msg);
  }
  
  const global = {
    mongoDBUri: process.env.MONGODB_URI || throwErr('MONGODB_URI is unset'),
    secret: process.env.SECRET || throwErr('SECRET is unset'),
  };
  
  module.exports = global;