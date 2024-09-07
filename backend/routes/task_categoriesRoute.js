const task_categoriesController = require("../controllers/task_categoriesController");
const router = require("express").Router();

router.get("/", task_categoriesController.get);
router.put("/:id", task_categoriesController.update);

module.exports = router;
