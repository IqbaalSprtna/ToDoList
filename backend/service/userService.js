const { User } = require("../models");
const { hashPassword, comparePassword } = require("../lib/bcrypt");
const { generateToken } = require("../lib/jwt");

const register = async (params) => {
  const { name, email, password } = params;

  if (password.length <= 8) {
    throw { id: "PasswordTooShort" };
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw { id: "EmailAlreadyInUse" };
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw { id: "ErrorCreate" };
  }

  return user;
};

const login = async (params) => {
  const { email, password } = params;
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw { id: "InvalidCredentials" };
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw { id: "InvalidCredentials" };
  }

  const token = generateToken({ id: user.id });

  return { user, token };
};

module.exports = { register, login };
