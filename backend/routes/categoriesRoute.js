const categoriesController = require("../controllers/categoriesController");
const router = require("express").Router();

router.get("/", categoriesController.get);
router.post("/", categoriesController.create);
router.put("/:id", categoriesController.update);
router.delete("/:id", categoriesController.remove);

module.exports = router;
