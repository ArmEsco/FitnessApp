const bcrypt = require("bcrypt");
const path = require("path");

// Hashes the password created from thr client
function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

//compares the hashed passwords to make sure it true to login in
function comparePassword(plain, hashed) {
  return bcrypt.compareSync(plain, hashed);
}

module.exports = {
  hashPassword,
  comparePassword,
};
