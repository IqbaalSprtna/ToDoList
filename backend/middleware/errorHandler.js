const errorHandler = (err, req, res, next) => {
  console.log(err);

  switch (err.id) {
    case "ErrorNotFound":
      res.status(404).json({ message: "Error Not Found" });
      break;
    case "InvalidCredentials":
      res.status(401).json({ message: "Invalid Credentials" });
      break;
    case "Unauthorized":
      res.status(403).json({ message: "Unauthorized Access" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid or Expired Token" });
      break;
    case "PasswordTooShort":
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
      break;
    case "EmailAlreadyInUse":
      res.status(400).json({ message: "Email already in use" });
      break;
    case "ErrorCreate":
      res.status(400).json({ message: "Error Creating Record" });
      break;
    case "ErrorUpdate":
      res.status(400).json({ message: "Error Updating Record" });
      break;
    case "ErrorRemove":
      res.status(400).json({ message: "Error Deleting Record" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
