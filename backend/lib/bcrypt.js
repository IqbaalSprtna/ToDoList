const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(8);

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

const comparePassword = (plainPassword, encryptedPassword) => {
  return bcrypt.compareSync(plainPassword, encryptedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
