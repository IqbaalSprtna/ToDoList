const userService = require("../service/userService");

const regiter = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: "Register Successfully", data: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await userService.login(req.body);
    res.json({ message: "Login Successfully", user: user, token: token });
  } catch (error) {
    next(error);
  }
};

module.exports = { regiter, login };
