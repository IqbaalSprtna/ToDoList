const { User } = require("../models");
const { verifyToken } = require("../lib/jwt");

const authentication = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.split(" ")[1];
      const decode = verifyToken(token);

      if (decode) {
        const user = await User.findOne({
          where: { id: decode.id },
        });

        if (user) {
          req.loggedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          next();
        } else {
          throw { id: "InvalidCredentials" };
        }
      } else {
        throw { id: "JsonWebTokenError" };
      }
    } else {
      throw { id: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
