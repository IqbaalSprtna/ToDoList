const taskController = require("../controllers/taskController");
const router = require("express").Router();

router.get("/", taskController.get);
router.get("/category/:categoryId", taskController.getTaskByCategory);
router.get("/completed", taskController.getCompleteTask);
router.post("/", taskController.create);
router.put("/:taskId", taskController.update);
router.delete("/:taskId", taskController.remove);

module.exports = router;
