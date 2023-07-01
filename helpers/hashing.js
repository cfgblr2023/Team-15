const bcrypt = require("bcrypt");



const create_hash =  (plain_text) => {
  const salt =  bcrypt.genSaltSync();
  const hashed =  bcrypt.hashSync(plain_text, salt);
  return hashed;
};

const compare_hash =  (plain_text, hash) => {
  const match = bcrypt.compareSync(plain_text, hash);
  return match;
};

module.exports = { create_hash, compare_hash };
