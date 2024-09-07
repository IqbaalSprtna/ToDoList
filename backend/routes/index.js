const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/auth");

const userRoute = require("./userRoute");
const taskRoute = require("./taskRoute");
const categoriesRoute = require("./categoriesRoute");
const task_categoriesRoute = require("./task_categoriesRoute");

const PREFIX = "/v1/api";

router.use(`${PREFIX}/auth`, userRoute);

router.use(authentication);
router.use(`${PREFIX}/tasks`, taskRoute);
router.use(`${PREFIX}/categories`, categoriesRoute);
router.use(`${PREFIX}/task_categories`, task_categoriesRoute);

module.exports = router;
