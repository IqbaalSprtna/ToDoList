const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", userController.regiter);
router.post("/login", userController.login);

module.exports = router;
